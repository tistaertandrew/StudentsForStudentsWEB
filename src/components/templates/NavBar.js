import * as React from 'react';
import NavButton from "../molecules/NavButton";
import TitleNavButton from "../molecules/TitleNavButton";
import routes from '../../routes.json'
import {observer} from "mobx-react";
import {sessionStore} from "../../stores/SessionStore";
import DisplayUserMenuInfos from "../organisms/DisplayUserMenuInfos";
import DisplayUserMenuInfo from "../molecules/DisplayUserMenuInfo";
import {navigationStore} from "../../stores/NavigationStore";
import {Close, Menu} from "@mui/icons-material";

function NavBar() {
    const showMenu = () => {
        let menu = document.getElementById('menu')
        navigationStore.handleDisplayMenu(menu)
    }

    const hideMenu = () => {
        let menu = document.getElementById('menu')
        navigationStore.handleHideMenu(menu)
    }

    const isConnected = () => {
        return sessionStore.user ?
            <DisplayUserMenuInfos handleMenu={(e) => navigationStore.handleOpenMenu(e.currentTarget)}
                handleClose={() => navigationStore.handleCloseMenu()}
                anchorEl={navigationStore.element}
                label={`Bonjour, ${sessionStore.user.username}`}
                inputs={[
                    <DisplayUserMenuInfo route={routes.User}
                        onReset={() => navigationStore.handleCloseMenu()}
                        label={'Paramètres'} />,
                    <DisplayUserMenuInfo onClick={() => sessionStore.logout()}
                        onReset={() => navigationStore.handleCloseMenu()}
                        label={'Se déconnecter'} />]} />
            :
            <NavButton route={routes.Authentication} label={'SE CONNECTER'} />
    }

    const displayMenu = () => {
            return (
                <div className={navigationStore.menu} id={'menu'}>
                    <Close className={'close'} onClick={() => hideMenu()}/>
                    <ul>
                        <NavButton route={routes.Home} label={'ACCUEIL'} onClick={() => hideMenu()}/>
                        <NavButton route={routes.About} label={'A PROPOS'} onClick={() => hideMenu()}/>
                        <NavButton route={routes.Contact} label={'CONTACT'} onClick={() => hideMenu()}/>
                        {sessionStore.user && <NavButton route={routes.Requests} label={'DEMANDES'} onClick={() => hideMenu()}/>}
                        {sessionStore.user && <NavButton route={routes.Syntheses} label={'SYNTHESES'} onClick={() => hideMenu()}/>}
                        {sessionStore.user && <NavButton route={routes.Chat} label={'SALONS'} onClick={() => hideMenu()}/>}
                    </ul>
                </div>
            )
    }

    return (
        <nav className={'navbar'}>
            <ul className={'left'}>
                <Menu className={'open'} onClick={() => showMenu()}/>
            </ul>
            <ul className={'center'}>
                <TitleNavButton route={routes.Home} label={'STUDENTS FOR STUDENTS'} />
            </ul>
            <ul className={'right'}>
                {isConnected()}
            </ul>
            {displayMenu()}
        </nav>
    )/*

    return (
        <nav className={'navbar'}>
            <ul className={'left'}>
                <TitleNavButton route={routes.Home} label={'STUDENTS FOR STUDENTS'} />
            </ul>
            <ul className={'center'}>
                <NavButton route={routes.About} label={'A PROPOS'} />
                <NavButton route={routes.Contact} label={'CONTACT'} />
                {sessionStore.user && <NavButton route={routes.Requests} label={'DEMANDES'} />}
                {sessionStore.user && <NavButton route={routes.Syntheses} label={'SYNTHESES'} />}
                {sessionStore.user && <NavButton route={routes.Chat} label={'CHAT'} />}
            </ul>
            <ul className={'right'}>
                {isConnected()}
            </ul>
        </nav>
    )*/
}

export const ObservedNavBar = observer(NavBar)