import {Link} from "react-router-dom";

export default function RedirectLink({message, handleType, label}) {
    return (
        <p onClick={handleType} style={{width: '100%', textAlign: 'center', margin: '1%'}}>
            {message}
            <Link className={'redirect-auth'}>{label}</Link>
        </p>
    )
}