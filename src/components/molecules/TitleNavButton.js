import * as React from "react";
import {Link} from "react-router-dom";

export default function TitleNavButton({label, route}) {
    return (
        <Link to={route}>
            <li className={'title'}>{label}</li>
        </Link>
    )
}
