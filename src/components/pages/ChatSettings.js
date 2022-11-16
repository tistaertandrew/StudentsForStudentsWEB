import { ArrowBack } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../../style/chatSettings.scss';
import routes from '../../routes.json';
import { chatRoomStore } from '../../stores/ChatRoomStore';
import { observer } from 'mobx-react-lite';
import ChatSettingsItem from '../molecules/ChatSettingsItem';

const ChatSettings = () => {

    useEffect(() => {
        chatRoomStore.start();
        return () => chatRoomStore.dispose();
    }, []);

    return (
        <div className='chat_settings'>
            <div className='chat_settings__header'>
                <Link to={routes.Chat}><ArrowBack className='chat_settings__header__arrow_back' /></Link>
                <h1 className='chat_settings__header__title'>Paramètres du chat</h1>
            </div>
            <div className='chat_settings__rooms'>
                <h2 className='chat_settings__rooms__title'>liste des rooms</h2>
                {chatRoomStore.rooms && chatRoomStore.rooms.map(room => {
                    const deleteCallback = chatRoomStore.getDeleteRoomCallback(room);
                    return { ...room, onDelete: deleteCallback }
                }).map(room => {
                    return (
                        <ChatSettingsItem roomName={room.name} onDelete={room.onDelete} />
                    )
                })}
                <div className='chat_settings__rooms__add'>
                    <form onSubmit={(e) => chatRoomStore.onAddChatRoom(e.target[0].value)} className='chat_settings_rooms__add__form'>
                        <input type='text' placeholder='nom de la room' className='chat_settings_rooms__add__form__input' />
                        <button type='submit' className='chat_settings_rooms__add__form__button'>Ajouter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const ChatSettingsObserver = observer(ChatSettings)