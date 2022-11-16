import * as React from "react";
import {Link} from "react-router-dom";

export default function NavButton({route, label, onClick}) {
    return (
        <Link to={route} onClick={onClick}>
            <li className={'nav-button'}>{label}</li>
        </Link>
    )
}