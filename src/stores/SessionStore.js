import {makeAutoObservable} from "mobx";
import User from "../models/User";
import config from '../config.json'

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
            this.fetchUser(token)
                .then(data => {
                    if (!data.error) {
                        this.user = data
                    }
                })
        }
    }

    fetchUser(token) {
        return fetch(`${config.ApiUrl}/User/WhoAmI`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.json())
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