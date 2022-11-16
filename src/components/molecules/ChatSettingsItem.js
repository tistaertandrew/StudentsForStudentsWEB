import React from 'react'
import {Delete} from '@mui/icons-material';


const ChatSettingsItem = ({ roomName, onDelete }) => {
    return (
        <div className='chat_settings__rooms__list'>
            <div className='chat_settings__rooms__list__room'>
                <div className='chat_settings__rooms__list__room__info'>
                    <div className='chat_settings__rooms__list__room__info__name'>{roomName}</div>
                </div>
                <Delete onClick={onDelete} className='chat_settings__rooms__list__room__delete' />
            </div>
        </div>
    )
}

export default ChatSettingsItem