import {makeAutoObservable} from "mobx";

class ContactStore {
    _open = false
    _message = undefined
    _severity = 'error'

    constructor() {
        makeAutoObservable(this)
    }

    get severity() {
        return this._severity
    }

    set severity(severity) {
        this._severity = severity
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

    set message(message) {
        this._message = message
    }

    handleSubmit(data) {

    }
}

export const contactStore = new ContactStore()