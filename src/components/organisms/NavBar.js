import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useState} from "react";
import UserBar from "../molecules/UserBar";
import SearchBar from "../molecules/SearchBar";
import Title from "../molecules/Title";
import Menu from "../molecules/Menu";
import AuthBar from "../molecules/AuthBar";

export default function NavBar() {
    const [auth, setAuth] = useState(true)

    if (auth) {
        return (
            <Box>
                <AppBar className={'static'}>
                    <Toolbar className={'bg-black'}>
                        <Menu />
                        <Title />
                        <Box sx={{flexGrow: 1}}/>
                        <SearchBar />
                        <UserBar />
                    </Toolbar>
                </AppBar>
            </Box>
        )
    } else {
        return (
            <Box>
                <AppBar className={'static'}>
                    <Toolbar className={'bg-black'}>
                        <Menu />
                        <Title />
                        <Box sx={{flexGrow: 1}}/>
                        <AuthBar />
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}
