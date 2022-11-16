import {makeAutoObservable} from "mobx";

class NavigationStore {
    _element = null
    _menu = 'menu'

    constructor() {
        makeAutoObservable(this)
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