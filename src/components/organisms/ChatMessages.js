import React from 'react'
import ChatMessage from '../molecules/ChatMessage'

const ChatMessages = ({ messages }) => {

    if (!messages) {
        return <div className='chat_messages noRoomSelected'>Choisissez un salon pour commencer à discuter</div>
    } else if (messages.length === 0) {
        return <div className='chat_messages noRoomSelected'>Aucun message dans ce salon</div>
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