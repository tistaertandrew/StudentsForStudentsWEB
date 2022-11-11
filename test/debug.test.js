import { RoomMessage } from "../src/models/RoomMessage";
import ChatRoomFirebase from "../src/repositories/ChatRoomFirebase";
import ChatRoomRepository from "../src/repositories/ChatRoomRepository";
import ChatRoomStore from "../src/stores/ChatRoomStore";

test('debuging', async () => {

    const api = new ChatRoomFirebase();
    const repo = new ChatRoomRepository({ chatRoomSource: api });
    const store = new ChatRoomStore({ repository: repo });

    await new Promise(resolve => setTimeout(resolve, 2000));

    store.createRoom('hello');
});