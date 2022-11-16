import React from 'react'
import ChatNavbar from '../molecules/ChatNavbar'
import ChatList from '../templates/ChatList'
import SearchForm from '../molecules/SearchForm'

const ChatSidebar = ({ username, rooms, activeRoom }) => {
    return (
        <div className='chat_sidebar'>
            <ChatNavbar username={username} />
            <SearchForm />
            <ChatList rooms={rooms} activeRoom={activeRoom} />
        </div>
    )
}

export default ChatSidebar