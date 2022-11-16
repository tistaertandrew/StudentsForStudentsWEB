import React from 'react'
import RoomCard from '../molecules/RoomCard';

const ChatList = ({ rooms, activeRoom }) => {

    console.log(activeRoom)

    const sort = (a, b) => {

        if (!a.lastMessageDate) return 1;
        if (!b.lastMessageDate) return -1;

        if (a.lastMessageDate > b.lastMessageDate) {
            return -1;
        }
        if (a.lastMessageDate < b.lastMessageDate) {
            return 1;
        }
        return 0;
    }

    return (
        <div className='chat_list'>
            <div className='chat_list__list'>
                {
                    rooms && Object
                        .entries(rooms)
                        ?.sort((a, b) => {
                            return sort(a[1], b[1])
                        })
                        .map((room) => {
                            return (
                                <RoomCard key={room[1].uid} room={room} isActive={activeRoom && activeRoom === room[1].uid} />
                            )
                        })
                }
            </div>
        </div>
    )
}

export default ChatList;