/**
 *
 * @property {String} uid
 * @property {[String]} messages
 */
export default class Room {
    constructor() {
        this.name = null;
        this.uid = null;
        this.lastMessageText = null;
        this.lastMesageDate = null;
        this.chatters = [];
    }

    /**
     * Create a room from a document
     * @param {DocumentSnapshot} doc
     * @returns
     */
    static fromDocument(doc) {
        const room = new Room();
        try {
            room.name = doc.name;
            room.uid = doc.uid;
            room.chatters = doc.chatters;
            room.lastMessageText = doc.lastMessage.text;
            room.lastMessageDate = doc.lastMessage.timestamp && Date(doc.lastMessage.timestamp.seconds * 1000);
        } catch (error) {
            console.error("Error creating room from document: ", error);
        }
        return room;
    }
}
