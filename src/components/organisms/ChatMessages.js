import React from 'react'
import ChatMessage from '../molecules/ChatMessage'

const ChatMessages = ({ messages }) => {

    if (!messages) {
        return <div className='chat_messages noRoomSelected'>Select a chat room to start messaging</div>
    } else if (messages.length === 0) {
        return <div className='chat_messages noRoomSelected'>No messages in this chat room</div>
    }

    return (
        <div className='chat_messages'>
            {messages && Object.entries(messages)
                ?.sort((a, b) => {
                    return b[1].date - a[1].date
                })
                .map((message) => {
                    return (
                        <ChatMessage message={message} />
                    )
                })}
        </div>
    )
}

export default ChatMessages