import {makeAutoObservable} from "mobx";
import {sessionStore} from "./SessionStore";
import User from "../models/User";
import {api} from "../repositories/Api";

class AdminStore {
    _users = [];

    _message = undefined
    _severity = 'error'
    _open = false

    constructor() {
        makeAutoObservable(this)
    }

    get users() {
        return this._users
    }

    set users(data) {
        this._users = data.map(user => {
            return new User(user.username, user.email, user.token, user.cursusId, user.isAdmin, user.isBanned)
        })
    }

    get message() {
        return this._message
    }

    set message(data) {
        this._message = data
    }

    get severity() {
        return this._severity
    }

    set severity(data) {
        this._severity = data
    }

    get open() {
        return this._open
    }

    set open(data) {
        this._open = data
    }

    init() {
        this.loadUsers()
    }

    loadUsers() {
        api.fetchUsers(sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized || data.forbidden) {
                        sessionStore.logout()
                    }
                } else {
                    this.users = data
                }
            })
    }

    handleBlock(email) {
        api.updateBannedStatus(email, sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized || data.forbidden) {
                        sessionStore.logout()
                    } else {
                        this.handleErrorMessage(data.message)
                    }
                } else {
                    this.handleSuccessMessage(data.message)
                }
            })
    }

    handleDelete(email) {
        api.deleteUser(email, sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized || data.forbidden) {
                        sessionStore.logout()
                    } else {
                        this.handleErrorMessage(data.message)
                    }
                } else {
                    this.handleSuccessMessage(data.message)
                }
            })
    }

    handleErrorMessage(message) {
        this.message = message
        this.severity = 'error'
        this.open = true

        setTimeout(() => {
            this.open = false
        }, 2500)
    }

    handleSuccessMessage(message) {
        this.message = message
        this.severity = 'success'
        this.open = true

        setTimeout(() => {
            this.open = false
        }, 2500)
    }
}

export const adminStore = new AdminStore()