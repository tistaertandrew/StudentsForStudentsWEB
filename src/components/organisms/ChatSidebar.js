import React from 'react'
import ChatList from '../templates/ChatList'

const ChatSidebar = ({ rooms, activeRoom }) => {
    return (
        <div className='chat_sidebar'>
            <ChatList rooms={rooms} activeRoom={activeRoom} />
        </div>
    )
}

export default ChatSidebar