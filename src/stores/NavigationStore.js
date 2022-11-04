import {makeAutoObservable, makeObservable} from "mobx";

class NavigationStore {
    _element = null

    constructor() {
        makeAutoObservable(this)
    }

    get element() {
        return this._element
    }

    set element(v) {
        this._element = v
    }

    handleOpenMenu(target) {
        this.element = target
    }

    handleCLoseMenu() {
        this.element = null
    }
}

export const navigationStore = new NavigationStore()