import * as React from "react";
import {Link} from "react-router-dom";

export default function NavButton({route, label}) {
    return (
        <Link to={route}>
            <li className={'nav-button'}>{label}</li>
        </Link>
    )
}