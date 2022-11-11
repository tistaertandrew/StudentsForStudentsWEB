import { action, makeAutoObservable, observable } from 'mobx';
import { v4 as uuid } from 'uuid';
import Room from "../models/Room";
import { RoomMessage } from "../models/RoomMessage";

const INITIAL_ROOM_DATA = {
    name: null,
    chatters: [],
    lastMessage: {},
    uid: null
}

const INITIAL_CHAT_DATA = {
    messages: [],
}

/**
 * Exposes room collection and methods to interact with them.
 */
export default class ChatRoomRepository {
    constructor({ chatRoomSource }) {
        this._chatRoomSource = chatRoomSource;
        this._unsubscribe = undefined;
        this.rooms = [];

        makeAutoObservable(this, {
            // Don't make observable the folowing properties
            _unsubscribe: false,
            _chatRoomSource: false,
            stopListeningRooms: false,
            getRoomMessages: false,
            sendRoomMessage: false,
            getRoomByName: false,
            createNewRoom: action,
            // .struct makes sure observer won't be signaled unless the
            // object changed in a deepEqual manner.
            rooms: observable.struct,
        })
    }

    /**
     * Start listening to rooms changes
     * @returns {Function} a function to unsubscribe from the snapshot if no error occurs, otherwise undefined
     */
    startListeningRooms() {
        try {
            this._unsubscribe = this._chatRoomSource.getSnapchotOnRooms({
                onNext: (snapchot) => {
                    this.rooms = snapchot.docs.map(doc => {
                        return Room.fromDocument(doc.data())
                    });
                },
                onError: (error) => console.error("Error on listening room: ", error)
            });
        } catch (error) {
            console.error("Error on start listening room: ", error);
            return undefined;
        }
    }

    stopListeningRooms() {
        this._unsubscribe && this._unsubscribe();
    }

    /**
     * Create a new room
     * @param {String} roomName the room name to create
     * @returns {Promise<boolean>} true if the room is created, false otherwise
     */
    async createNewRoom(roomName) {
        try {
            const uid = uuid();
            await this._chatRoomSource.createRoom(roomName, { ...INITIAL_ROOM_DATA, uid: uid, name: roomName });
            await this._chatRoomSource.createChat(uid, INITIAL_CHAT_DATA);
            return true;
        } catch (error) {
            console.error("Error creating new room: ", error);
            return false;
        }
    }

    /**
     * Get the room's messages from the chat collection
     * @param {String} roomName the room name to get the messages from
     * @returns {RoomMessage[]} the room's messages or empty array if not found
     */
    async getRoomMessages(roomName) {
        const found = this.getRoomByName(roomName);
        if (!found) return [];
        try {
            const res = await this._chatRoomSource.getRoomMessages(found.uid);
            return res.data().messages.map(message => RoomMessage.fromObject(message));
        } catch (error) {
            console.error("Error getting room messages: ", error);
            return [];
        }
    }

    /**
     * Send a message to a room
     * @param {String} roomName the room name to send the message to
     * @param {String} message the message to send
     * @returns {Promise<boolean>} true if the message is sent, false otherwise
     */
    async sendMessage({ roomName, message, username }) {
        try {
            const found = this.getRoomByName(roomName);
            if (!found) return true;
            const timestamp = await this._chatRoomSource.sendMessage({ roomId: found.uid, message, senderUsername: username });
            await this._chatRoomSource.updateLastMessage({ roomName, message, senderUsername: username, timestamp });
            return true;
        } catch (error) {
            console.error("Error trying to send message: ", error);
            return false;
        }
    }

    /**
     * Get a room by name
     * @param {String} roomName 
     * @returns {Room} the room or undefined if not found
     */
    getRoomByName(roomName) {
        try {
            return this.rooms.find(room => room.name === roomName);
        } catch (error) {
            console.error("Error getting room: ", error);
            return undefined;
        }
    }

    // async loadRooms() {
    //     this.rooms = await this.chatRoomSource.getRooms();
    // }

    // async deleteRoom(roomId) {
    //     const isDeleted = await this.chatRoomSource.deleteRoom(roomId);

    //     if (isDeleted) {
    //         await this.loadRooms();
    //     }
    // }

    // async getRoom(roomId) {
    //     const found = this.rooms.find(room => room.uid === roomId);
    //     if (found) return found;
    //     return await this.chatRoomSource.getRoom(roomId);
    // }
}

