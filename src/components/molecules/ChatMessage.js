import React from 'react'

const ChatMessage = ({ message }) => {
    return (
        <div key={message[1].uid && 0} className={`chat_messages__message ${message[1].isOwner() && 'owner'}`}>
            <div className={`chat_messages__message__avatar ${message[1].isOwner() && 'owner'}`}>{message[1].senderUsername[0]}</div>
            <div className={`chat_messages__message__info ${message[1].isOwner() && 'owner'}`}>
                <div className='chat_messages__message__info__username'>{message[1].senderUsername}
                    <div className='chat_messages__message__info__time'>{message[1].dateString()}</div>
                </div>
                <div className={`chat_messages__message__info__message ${message[1].isOwner() && 'owner'}`}>{message[1].text}</div>
            </div>
        </div >
    )
}

export default ChatMessage