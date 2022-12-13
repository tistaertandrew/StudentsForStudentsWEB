import {
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    setDoc,
    Timestamp,
    updateDoc,
} from "firebase/firestore";

import {db} from "../firebase";

const CHAT_COLLECTION_NAME = "chats";

class ChatRoomFirebase {

    constructor(db) {
        this.db = db;
    }

    /**
     * Create a new room
     * @param {String} collectionName the collection name where to create the room
     * @param {String} roomName the room name to create
     * @returns {Promise<void>}
     */
    async createRoom(collectionName, roomName, data = {}) {
        return await setDoc(doc(this.db, collectionName, roomName), data);
    }

    /**
     * Create a new chat
     * @param {String} roomId the room name
     * @param {Object} data the data to create with
     * @returns {Promise<void>}
     */
    async createChat(roomId, data = {}) {
        return await setDoc(doc(this.db, CHAT_COLLECTION_NAME, roomId), data);
    }

    /**
     * Performs { onNext } on each room changes
     * @param {String} collectionName the collection to listen for his rooms
     * @param {Function} onNext function to call when a new snapchot is available
     * @param {Function} onError function to call when an error occurs
     * @returns a function to unsubscribe from the snapshot
     */
    getSnapchotOnRooms({ collectionName, onNext, onError }) {
        return onSnapshot(collection(this.db, collectionName), { next: onNext, error: onError })
    }

    /**
     * Performs { onNext } on each room's messages changes
     * @param {String} roomId the room id to listen for messages
     * @param {Function} onNext function to call when a new snapchot is available
     * @param {Function} onError function to call when an error occurs
     * @returns 
     */
    getSnapchotOnRoomMessages({ roomId, onNext, onError }) {
        return onSnapshot(doc(this.db, CHAT_COLLECTION_NAME, roomId), { next: onNext, error: onError })
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

    /**
     * Update the last message of a room
     * @param {String} collectionName the collection name where to update the room's last message
     * @param {String} roomName the room name to update the last message
     * @param {String} message the last message to update with
     * @param {String} senderUsername the sender username
     * @param {Timestamp} timestamp the timestamp when the message was sent
     * @returns {Promise<void>}
     */
    async updateLastMessage({ collectionName, roomName, message, senderUsername, timestamp }) {
        return await updateDoc(doc(this.db, collectionName, roomName), {
            lastMessage: {
                senderUsername: senderUsername,
                text: message,
                timestamp: timestamp
            }
        });
    }

    /**
     * Delete a room
     * @param {String} collectionName the collection name where to delete the room
     * @param {String} roomId the room's id to delete
     * @param {String} roomName the room's name to delete
     * @returns {Promise<void>}
     */
    async deleteRoom(collectionName, roomId, roomName) {
        await deleteDoc(doc(db, collectionName, roomName));
        await deleteDoc(doc(db, CHAT_COLLECTION_NAME, roomId));
    }

    async getRooms(collectionName) {
        return await getDocs(collection(this.db, collectionName));
    }

}

export const chatRoomFirebase = new ChatRoomFirebase(db);

