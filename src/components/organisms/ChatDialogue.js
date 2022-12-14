import React from 'react'
import ChatInput from '../molecules/ChatInput'
import ChatMessages from './ChatMessages'

const ChatDialogue = ({ messages, onSendMessage, }) => {
    return (
        <div className='chat_dialogue'>
            <ChatMessages messages={messages} />
            <ChatInput onSubmit={onSendMessage} isEnabled={messages && messages.length > 0} />
        </div>
    )
}

export default ChatDialogue