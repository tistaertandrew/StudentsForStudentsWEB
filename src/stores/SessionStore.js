import {makeAutoObservable} from "mobx";
import User from "../models/User";

class SessionStore {
    _user = undefined

    constructor() {
        makeAutoObservable(this)
        this.loadUser()
    }

    get user() {
        return this._user
    }

    set user(data) {
        if (data) {
            this._user = new User(data.username, data.email, data.token)
            this.saveUser()
        }
    }

    loadUser() {
        let userObject = JSON.parse(localStorage.getItem('StudentsForStudentsUser'))
        userObject ? this.user = userObject : this.user = undefined
    }

    saveUser() {
        let userObject = JSON.stringify(this.user)
        localStorage.setItem('StudentsForStudentsUser', userObject)
    }

    logout() {
        this._user = undefined
        localStorage.removeItem('StudentsForStudentsUser')
        window.location.reload()
    }
}

export const sessionStore = new SessionStore()