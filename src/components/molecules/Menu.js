import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";

export default function Menu() {
    return (
        <IconButton>
            <MenuIcon className={'text-white scale-150 m-1'}/>
        </IconButton>
    )
}