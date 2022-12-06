import React, {useEffect} from 'react'
import {observer} from 'mobx-react-lite'

import ChatSidebar from '../organisms/ChatSidebar'

import {chatRoomStore} from '../../stores/ChatRoomStore';

import '../../style/chat.scss'
import {sessionStore} from '../../stores/SessionStore';
import ChatDialogue from '../organisms/ChatDialogue';
import {ObservedNavBar} from "../templates/NavBar";

const Chat = () => {
    const onClickChatRoom = (room) => {
        chatRoomStore.setActiveRoom(room);
    }

    const onSendMessage = async (message) => {
        if (!chatRoomStore.isMessageEmpty(message) && chatRoomStore.activeRoom) {
            await chatRoomStore.sendMessage(message);
        }
    }

    useEffect(async () => {
        chatRoomStore.definePropertiesToIncomingRooms({
            onClick: onClickChatRoom,
            dateString: (room) => chatRoomStore.getDateTimeString(room.lastMessageDate)
        })

        chatRoomStore.definePropertiesToIncommingMessages({
            dateString: (message) => chatRoomStore.getDateTimeString(message.date),
            isOwner: (message) => chatRoomStore.isCurrentUsername(message.senderUsername),
            id: (message) => message.date.valueOf(),
        })

        await chatRoomStore.setActiveUser(sessionStore.user);

        const disposer = chatRoomStore.initialize();

        return () => disposer()
    }, []);

    return (
        <div>
            <ObservedNavBar />
            <div id='chat'>
                <ChatSidebar
                    username={chatRoomStore.username}
                    rooms={chatRoomStore.rooms}
                    activeRoom={chatRoomStore.activeRoom?.uid}
                />
                <ChatDialogue
                    messages={chatRoomStore.messages}
                    onSendMessage={onSendMessage}
                />
            </div>
        </div>
    )
}

export const ChatObserver = observer(Chat)