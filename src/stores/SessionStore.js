import { makeAutoObservable } from "mobx";
import User from "../models/User";
import { api } from '../repositories/Api'

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
        let token = JSON.parse(localStorage.getItem('StudentsForStudentsUser'))
        if (token) {
            api.fetchUser(token)
                .then(data => {
                    if (!data.error) this.user = data
                })
        }
    }

    saveUser() {
        let token = JSON.stringify(this.user.token)
        localStorage.setItem('StudentsForStudentsUser', token)
    }

    logout() {
        this._user = undefined
        localStorage.removeItem('StudentsForStudentsUser')
        window.location.reload()
    }
}

export const sessionStore = new SessionStore()