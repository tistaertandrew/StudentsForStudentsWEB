import React from 'react'

const RoomCard = ({ room, isActive }) => {
    return (
        <div className={`chat_list__list__room ${isActive && 'isActive'}`} onClick={async () => await room[1].onClick()}>
            <div className='chat_list__list__room__data'>
                <div className='chat_list__list__room__data__avatar' >{room[1].name[0]}</div>
                <div className='chat_list__list__room__data__info'>
                    <div className='chat_list__list__room__data__info__name' >{room[1].name}</div>
                    <div className='chat_list__list__room__data__info__lastmessage' >{room[1].lastMessageText}</div>
                </div>
            </div>
            <div className='chat_list__list__room__time' >{room[1].dateString()}</div>
        </div>
    )
}

export default RoomCard