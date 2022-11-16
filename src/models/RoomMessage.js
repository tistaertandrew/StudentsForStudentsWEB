export class RoomMessage {
    constructor() {
        this.text = null;
        this.date = null;
        this.senderUsername = null;
    }

    static fromObject(obj) {
        const message = new RoomMessage();
        try {
            message.text = obj.text;
            message.date = obj.timestamp && new Date(obj.timestamp.seconds * 1000);
            message.senderUsername = obj.senderUsername;
        } catch (error) {
            console.error("Error parsing message: ", error);
        }
        return message;
    }
}