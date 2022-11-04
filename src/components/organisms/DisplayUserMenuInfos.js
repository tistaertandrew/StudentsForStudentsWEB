import {sessionStore} from "../../stores/SessionStore";
import {Menu, MenuItem} from "@mui/material";
import NavButton from "../molecules/NavButton";
import routes from "../../routes.json";
import * as React from "react";

export default function DisplayUserMenuInfos({label, handleMenu, anchorEl, handleClose, inputs}) {
    return (
        <div>
            <h1 onClick={handleMenu} className={'subtitle'}>{label}</h1>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {inputs.map(input => input)}
            </Menu>
        </div>
    )
}