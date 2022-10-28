import * as React from 'react';
import {useState} from 'react';
import AccountCircle from "@mui/icons-material/AccountCircle";
import NavButton from "../molecules/NavButton";
import TitleNavButton from "../molecules/TitleNavButton";
import routes from '../../routes.json'

export default function NavBar() {
    const [auth, setAuth] = useState(false)

    const isConnected = () => {
        return auth ?
            <NavButton route={routes.User} label={<AccountCircle className={'icon'}/>}/> :
            <NavButton route={routes.Authentication} label={'SE CONNECTER'}/>
    }

    return (
        <nav className={'navbar'}>
            <ul className={'left'}>
                <TitleNavButton route={routes.Home} label={'STUDENTS FOR STUDENTS'}/>
            </ul>
            <ul className={'right'}>
                <NavButton route={routes.About} label={'A PROPOS'}/>
                <NavButton route={routes.Contact} label={'CONTACT'}/>
                {isConnected()}
            </ul>
        </nav>
    )
}
