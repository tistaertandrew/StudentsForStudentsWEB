import {MenuItem} from "@mui/material";
import {Link} from "react-router-dom";

export default function DisplayUserMenuInfo({onClick, route, label, onReset}) {
    if (onClick) {
        return (
            <MenuItem onClick={onClick}>
                <p onClick={onReset}>{label}</p>
            </MenuItem>
        )
    }

    if (route) {
        return (
            <Link to={route}>
                <MenuItem>
                    <p onClick={onReset}>{label}</p>
                </MenuItem>
            </Link>
        )
    }
}