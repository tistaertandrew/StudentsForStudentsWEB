import {Link} from "react-router-dom";

export default function RedirectLink({handleType, label}) {
    return(
        <Link className={'redirect-auth'} onClick={handleType}>
            <p>{label}</p>
        </Link>
    )
}