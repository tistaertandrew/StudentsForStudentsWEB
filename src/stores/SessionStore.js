import {makeAutoObservable} from "mobx";
import User from "../models/User";

class SessionStore {
    user = undefined

    constructor() {
        makeAutoObservable(this)
        this.loadUser()
    }

    loadUser() {
        let userObject = JSON.parse(localStorage.getItem('StudentsForStudentsUser'))
        this.user = userObject ? new User(userObject.username, userObject.email, userObject.token) : undefined
    }
}

export const sessionStore = new SessionStore()