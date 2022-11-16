import { v4 as uuid } from 'uuid';
import Room from "../models/Room";
import { RoomMessage } from "../models/RoomMessage";
import { chatRoomFirebase } from './ChatRoomFirebase';

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
export class ChatRoomRepository {
    constructor({ chatRoomSource }) {
        this._chatRoomSource = chatRoomSource;
    }

    /**
     * Start listening to rooms changes
     * @returns {Function} a function to unsubscribe from the snapshot if no error occurs, otherwise undefined
     */
    onRoomsChange({ collectionName, callback }) {
        try {
            return this._chatRoomSource.getSnapchotOnRooms({
                collectionName: collectionName,
                onNext: (snapchot) => {
                    const rooms = snapchot.docs.map(doc => Room.fromDocument(doc.data()));
                    callback && callback(rooms);
                },
                onError: (error) => console.error("Error on listening room: ", error)
            });
        } catch (error) {
            console.error("Error on start listening room: ", error);
            return undefined;
        }
    }

    /**
     * Listen to a room's messages
     * @param {String} roomName 
     * @returns {Function} a function to unsubscribe from the snapshot if no error occurs, otherwise undefined
     */
    onRoomMessagesChange({ room, callback }) {
        try {
            if (!room) return undefined;
            return this._chatRoomSource.getSnapchotOnRoomMessages({
                roomId: room.uid,
                onNext: (snapchot) => {
                    const messages = snapchot.data().messages.map(message => RoomMessage.fromObject(message));
                    callback && callback(messages);
                },
                onError: (error) => console.error("Error on listening room messages: ", error)
            });
        } catch (error) {
            console.error("Error on start listening room messages: ", error);
            return undefined;
        }
    }

    /**
     * Create a new room with his chats
     * @param {String} collectionName the name of the collection to create
     * @param {String} roomName the room name to create
     * @returns {Promise<boolean>} true if the room is created, false otherwise
     */
    async createRoom(collectionName, roomName) {
        try {
            const uid = uuid();
            await this._chatRoomSource.createRoom(collectionName, roomName, { ...INITIAL_ROOM_DATA, uid: uid, name: roomName });
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
    async getRoomMessages(room) {
        if (!room) return [];
        try {
            const res = await this._chatRoomSource.getRoomMessages(room.uid);
            const data = res.data()
            return data.messages.map(message => RoomMessage.fromObject(message));
        } catch (error) {
            console.error("Error getting room messages: ", error);
            return [];
        }
    }

    async getRooms(collectionName) {
        try {
            const res = await this._chatRoomSource.getRooms(collectionName);
            return res.docs.map(doc => Room.fromDocument(doc.data()));
        } catch (error) {
            console.error("Error trying to get rooms: ", error);
            return [];
        }
    }

    /**
     * Send a message to a room
     * @param {String} roomName the room name to send the message to
     * @param {String} message the message to send
     * @returns {Promise<boolean>} true if the message is sent, false otherwise
     */
    async sendMessage({ collectionName, room, message, username }) {
        try {
            if (!room) return false;
            const timestamp = await this._chatRoomSource.sendMessage({ roomId: room.uid, message, senderUsername: username });
            await this._chatRoomSource.updateLastMessage({ collectionName, roomName: room.name, message, senderUsername: username, timestamp });
            return true;
        } catch (error) {
            console.error("Error trying to send message: ", error);
            return false;
        }
    }

    /**
     * Try to delete a room
     * @param {Room} room the room to delete
     * @returns {Promise<boolean>} true if the room is deleted, false otherwise
     */
    async deleteRoom(room) {
        try {
            await this._chatRoomSource.deleteRoom(room.uid, room.name);
            return true;
        } catch (error) {
            console.error("Error trying to delete room: ", error);
            return false;
        }
    }

}

export const chatRoomRepository = new ChatRoomRepository({ chatRoomSource: chatRoomFirebase });

