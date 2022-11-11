

import {
    doc,
    getDoc,
    setDoc,
    collection,
    updateDoc,
    onSnapshot,
    arrayUnion,
    Timestamp,
} from "firebase/firestore";

const ROOM_COLLECTION_NAME = "rooms";
const CHAT_COLLECTION_NAME = "chats";

export default class ChatRoomFirebase {

    constructor(db) {
        this.db = db;
    }

    /**
     * Create a new room
     * @param {String} roomName the room name to create
     * @returns {Promise<void>}
     */
    async createRoom(roomName, data = {}) {
        return await setDoc(doc(this.db, ROOM_COLLECTION_NAME, roomName), data);
    }

    /**
     * Create a new chat
     * @param {String} roomName the room name
     * @param {Object} data the data to create with
     * @returns {Promise<void>}
     */
    async createChat(roomName, data = {}) {
        return await setDoc(doc(this.db, CHAT_COLLECTION_NAME, roomName), data);
    }

    /**
     * Performs { onNext } on each room changes
     * @param {Function} onNext function to call when a new snapchot is available
     * @param {Function} onError function to call when an error occurs
     * @returns a function to unsubscribe from the snapshot
     */
    getSnapchotOnRooms({ onNext, onError }) {
        return onSnapshot(collection(this.db, ROOM_COLLECTION_NAME), { next: onNext, error: onError })
    }

    /**
     * Get the room's messages from the chat collection
     * @param {String} roomId room id
     * @returns {Promise<Object>} the chat document containing room's messages
     */
    async getRoomMessages(roomId) {
        return await getDoc(doc(this.db, CHAT_COLLECTION_NAME, roomId));
    }

    /**
     * Send a message to a room
     * @param {String} roomId the room id where to send the message
     * @param {{String, String, Date}} message the message to send
     * @returns {Promise<Timestamp>} the timestamp when the message was sent
     */
    async sendMessage({ roomId, message, senderUsername }) {
        const timestamp = Timestamp.now();

        await updateDoc(doc(this.db, CHAT_COLLECTION_NAME, roomId), {
            messages: arrayUnion({
                senderUsername: senderUsername,
                text: message,
                timestamp: timestamp
            })
        });

        return timestamp;
    }

    async updateLastMessage({ roomName, message, senderUsername, timestamp }) {
        return await updateDoc(doc(this.db, ROOM_COLLECTION_NAME, roomName), {
            lastMessage: {
                senderUsername: senderUsername,
                text: message,
                timestamp: timestamp
            }
        });
    }

    // /**
    //  * @returns {Promise<Room[]>} the list of rooms
    //  */
    // async getRooms() {
    //     const rooms = [];
    //     try {
    //         const snapchot = await getDocs(collection(db, ROOM_COLLECTION_NAME));
    //         snapchot.forEach((doc) => rooms.push(Room.fromDocument(doc.data())));
    //     } catch (error) {
    //         console.error("Error getting rooms: ", error);
    //     }
    //     return rooms;
    // }

    // /**
    //  * @param {String} roomId 
    //  * @returns {Promise<Room>} the room
    //  */
    // async getRoom(roomId) {
    //     try {
    //         const doc = await getDoc(doc(db, ROOM_COLLECTION_NAME, roomId));
    //         return Room.fromDocument(doc);
    //     } catch (error) {
    //         console.error("Error getting room: ", error);
    //         return new Room();
    //     }
    // }


    // /**
    //  * Delete a room
    //  * @param {String} roomId
    //  * @returns {Promise<boolean>} true if the room is deleted, false otherwise
    //  */
    // async deleteRoom(roomId) {
    //     try {
    //         await deleteDoc(doc(db, ROOM_COLLECTION_NAME, roomId));
    //         return true;
    //     } catch (error) {
    //         console.error("Error deleting room: ", error);
    //         return false;
    //     }
    // }

    // /**
    //  * Update the room with the new message
    //  * @param {String} roomId 
    //  * @param {RoomMessage} data 
    //  * @returns {Promise<boolean>} true if the message is added, false otherwise
    //  */
    // async updateRoom(roomId, data) {
    //     try {
    //         await updateDoc(doc(db, ROOM_COLLECTION_NAME, roomId), data);
    //         return true;
    //     } catch (error) {
    //         console.error("Error updating document: ", error);
    //         return false;
    //     }
    // }

    // /**
    //  * @param {String} roomId 
    //  * @returns {Promise<RoomMessage[]>} the list of messages
    //  */
    // async getRoomMessages(roomId) {
    //     const messages = [];
    //     try {
    //         const room = await this.getRoom(roomId);
    //         room.messages.forEach((message) => messages.push(RoomMessage.fromObject(message)));
    //     } catch (error) {
    //         console.error("Error getting messages: ", error);
    //     }
    //     return messages;
    // }

}

class RoomCollection {
    constructor() {
        this.documents = [];
    }
}

