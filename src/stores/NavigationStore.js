import {makeAutoObservable} from "mobx";

class NavigationStore {
    _open = false
    _message = ''
    _severity = 'error'
    _element = null
    _menu = 'menu'

    constructor() {
        makeAutoObservable(this)
    }

    get open() {
        return this._open
    }

    set open(v) {
        this._open = v
    }

    get message() {
        return this._message
    }

    set message(v) {
        this._message = v
    }

    get severity() {
        return this._severity
    }

    set severity(v) {
        this._severity = v
    }

    get menu() {
        return this._menu
    }

    set menu(v) {
        this._menu = v
    }

    get element() {
        return this._element
    }

    set element(v) {
        this._element = v
    }

    handleNotification(message) {
        this.message = message
        this.severity = 'info'
        this.open = true
    }

    hideNotification() {
        this.open = false
        this.severity = 'info'
        this.message = ''
    }

    handleDisplayMenu(menu) {
        this.menu = 'menu active'
        menu.className = this.menu
    }

    handleHideMenu(menu) {
        this.menu = 'menu'
        menu.className = this.menu
    }

    handleOpenMenu(target) {
        this.element = target
    }

    handleCloseMenu() {
        this.element = null
    }
}

export const navigationStore = new NavigationStore()