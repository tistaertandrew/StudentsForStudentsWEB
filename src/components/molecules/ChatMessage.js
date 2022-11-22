import React from 'react'

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat_messages__message ${message.isOwner() && 'owner'}`}>
            <div className={`chat_messages__message__avatar ${message.isOwner() && 'owner'}`}>{message.senderUsername[0]}</div>
            <div className={`chat_messages__message__info ${message.isOwner() && 'owner'}`}>
                <div className='chat_messages__message__info__username'>{message.senderUsername}
                    <div className='chat_messages__message__info__time'>{message.dateString()}</div>
                </div>
                <div className={`chat_messages__message__info__message ${message.isOwner() && 'owner'}`}>{message.text}</div>
            </div>
        </div >
    )
}

export default ChatMessage