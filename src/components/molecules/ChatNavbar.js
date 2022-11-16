import { Settings } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../routes.json'

/**
 * Holds the current user's name
 * @returns {JSX.Element}
 */
const ChatNavbar = ({ username }) => {
    return (
        <div className='chat_navbar'>
            <div className='chat_navbar__username'>{username}</div>
        </div>
    )
}

export default ChatNavbar