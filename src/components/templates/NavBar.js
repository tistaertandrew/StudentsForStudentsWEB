import * as React from 'react';
import {useState} from 'react';
import AccountCircle from "@mui/icons-material/AccountCircle";
import NavButton from "../molecules/NavButton";
import TitleNavButton from "../molecules/TitleNavButton";
import routes from '../../routes.json'
import {observer} from "mobx-react";
import {sessionStore} from "../../stores/SessionStore";
import {IconButton, Menu, MenuItem} from "@mui/material";
import DisplayUserMenuInfos from "../organisms/DisplayUserMenuInfos";
import DisplayUserMenuInfo from "../molecules/DisplayUserMenuInfo";
import {navigationStore} from "../../stores/NavigationStore";

function NavBar() {
    const isConnected = () => {
        return sessionStore.user ?
            <DisplayUserMenuInfos handleMenu={(e) => navigationStore.handleOpenMenu(e.currentTarget)}
                                  handleClose={() => navigationStore.handleCLoseMenu()}
                                  anchorEl={navigationStore.element}
                                  label={`Bonjour, ${sessionStore.user.username}`}
                                  inputs={[
                                      <DisplayUserMenuInfo route={routes.User}
                                                           onReset={() => navigationStore.handleCLoseMenu()}
                                                           label={'Paramètres'}/>,
                                      <DisplayUserMenuInfo onClick={() => sessionStore.logout()}
                                                           onReset={() => navigationStore.handleCLoseMenu()}
                                                           label={'Se déconnecter'}/>]}/>
            :
            <NavButton route={routes.Authentication} label={'SE CONNECTER'}/>
    }

    return (
        <nav className={'navbar'}>
            <ul className={'left'}>
                <TitleNavButton route={routes.Home} label={'STUDENTS FOR STUDENTS'}/>
            </ul>
            <ul className={'center'}>
                <NavButton route={routes.About} label={'A PROPOS'}/>
                <NavButton route={routes.Contact} label={'CONTACT'}/>
                <NavButton route={routes.Requests} label={'DEMANDES'}/>
                <NavButton route={routes.Syntheses} label={'SYNTHESES'}/>
            </ul>
            <ul className={'right'}>
                {isConnected()}
            </ul>
        </nav>
    )
}

export const ObservedNavBar = observer(NavBar)