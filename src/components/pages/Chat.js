import React from 'react'

const Chat = ({ chatRoomStore }) => {

    const { currentRoom, rooms } = chatRoomStore

    return (
        <div>{console.log(rooms)}</div>
    )
}

export default Chat