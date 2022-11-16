import { Send } from '@mui/icons-material'
import React, { useState } from 'react'

const ChatInput = ({ onSubmit }) => {

    const [text, setText] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(text);
        setText('');
    }

    return (
        <div className='chat_input'>
            <form id='chat_submit_message' className='chat_input__form' onSubmit={handleSubmit}>
                <input value={text} onChange={(e) => setText(e.target.value)} className='chat_input__form__input' type='text' placeholder='Votre message...' />
            </form>
            <button form='chat_submit_message' type='submit' className='chat_input__send'>
                <Send className='chat_input__send__icon' />
            </button>
        </div>
    )
}

export default ChatInput