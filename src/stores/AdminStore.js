import {makeAutoObservable} from "mobx";
import {sessionStore} from "./SessionStore";
import User from "../models/User";
import {api} from "../repositories/Api";
import Section from "../models/Section";
import Cursus from "../models/Cursus";

class AdminStore {
    _users = [];
    _sections = []
    _cursus = []

    _message = undefined
    _severity = 'error'
    _open = false

    _userPopup = false
    _filterPopup = false

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

    get userPopup() {
        return this._userPopup
    }

    set userPopup(data) {
        this._userPopup = data
    }

    get filterPopup() {
        return this._filterPopup
    }

    set filterPopup(data) {
        this._filterPopup = data
    }

    get sections() {
        return this._sections
    }

    set sections(data) {
        this._sections = data
    }

    get cursus() {
        return this._cursus
    }

    set cursus(data) {
        this._cursus = data
    }

    init() {
        this.loadUsers()
        this.loadSections()
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

    loadSections() {
        api.loadSections()
            .then(data => data.map(d => new Section(d.id, d.label)))
            .then(sections => this.sections = sections)
    }

    loadCursus(id) {
        api.loadCursus(id)
            .then(data => data.map(d => new Cursus(d.id, d.label, new Section(d.section.id, d.section.label))))
            .then(cursus => this.cursus = cursus)
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

    handleEdit(lastname, firstname, newLastname, newFirstame, email) {
        if(newLastname === '' || newFirstame === '') {
            this.handleErrorMessage('Veuillez remplir tous les champs')
            return
        }

        if(lastname === newLastname && firstname === newFirstame) return

        api.UpdateUser(newLastname, newFirstame, email, sessionStore.user.token)
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

    openUserPopup() {
        this.userPopup = true
    }

    closeUserPopup() {
        this.userPopup = false
    }

    openFilterPopup() {
        this.filterPopup = true
    }

    closeFilterPopup() {
        this.filterPopup = false
    }

    handleAdd(data) {
        this.addUser(...data.values())
    }

    addUser(lastname, firstname, email, sectionId, cursusId, password, confirmPassword) {

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (lastname === '') {
            this.handleErrorMessage('Le champ "Nom de famille" est obligatoire')
            return
        }
        if (firstname === '') {
            this.handleErrorMessage('Le champ "Prénom" est obligatoire')
            return
        }
        if (email === '') {
            this.handleErrorMessage('Le champ "Adresse mail" est obligatoire')
            return
        }
        if (!email.match(emailRegex)) {
            this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return
        }
        if (sectionId === '') {
            this.handleErrorMessage('Le champ "Section" est obligatoire')
            return
        }
        if (cursusId === '') {
            this.handleErrorMessage('Le champ "Cursus" est obligatoire')
            return
        }
        if (password === '') {
            this.handleErrorMessage('Le champ "Mot de passe" est obligatoire')
            return
        }
        if (confirmPassword === '') {
            this.handleErrorMessage('Le champ "Confirmation du mot de passe" est obligatoire')
            return
        }
        if (password !== confirmPassword) {
            this.handleErrorMessage('Le mot de passe et sa confirmation doivent être identique')
            return
        }

        api.signUp(lastname, firstname, email, sectionId, cursusId, password)
            .then(data => {
                if (data.error) {
                    this.handleErrorMessage(data.message)
                } else {
                    this.handleSuccessMessage(data.message)
                    this.closeUserPopup()
                }
            })
    }

    handleFilterUsers(data) {
        let filterValue = [...data.values()][0]
        if(filterValue === '') {
            this.handleErrorMessage('Le champ "Nom/Prénom/Email" est obligatoire')
            return
        }

        api.fetchUsers(sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized || data.forbidden) {
                        sessionStore.logout()
                    }
                } else {
                    this.users = data
                    this.users = this.users.filter(user => user.username.toLowerCase().includes(filterValue.toLowerCase()) || user.email.toLowerCase().includes(filterValue.toLowerCase()))
                    this.closeFilterPopup()
                }
            })
    }

    handleResetFilter() {
        this.loadUsers()
    }
}

export const adminStore = new AdminStore()