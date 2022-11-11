import { makeAutoObservable } from "mobx";

export default class ChatRoomStore {
    constructor({ repository, sessionStore }) {
        this.currentRoom = null;
        this.repository = repository;
        this.sessionStore = sessionStore;

        this.repository.startListeningRooms();
        makeAutoObservable(this);
    }

    async createRoom(room) {
        await this.repository.createNewRoom(room);
    }

    dispose() {
        this.repository.stopListeningRooms();
    }
}