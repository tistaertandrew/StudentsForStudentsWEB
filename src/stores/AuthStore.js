import {makeAutoObservable} from "mobx";
import {sessionStore} from "./SessionStore";
import config from '../config.json'
import Section from "../models/Section";
import Cursus from "../models/Cursus";

class AuthStore {
    _sections = []
    _cursus = []
    _mode = 'signin'
    _errorMessage = undefined
    _open = false

    constructor() {
        makeAutoObservable(this)
        this.loadSections()
    }

    get open() {
        return this._open
    }

    set open(v) {
        return this._open = v
    }

    get errorMessage() {
        return this._errorMessage
    }

    set errorMessage(message) {
        this._errorMessage = message
    }

    get mode() {
        return this._mode
    }

    set mode(mode) {
        this._mode = mode
    }

    get sections() {
        return this._sections
    }

    set sections(sections) {
        this._sections = sections
    }

    get cursus() {
        return this._cursus
    }

    set cursus(cursus) {
        this._cursus = cursus
    }

    loadSections() {
        fetch(`${config.ApiUrl}/School/Sections`)
            .then(resp => resp.json())
            .then(data => data.map(d => new Section(d.id, d.label)))
            .then(sections => this.sections = sections)
    }

    loadCursus(id) {
        fetch(`${config.ApiUrl}/School/Cursus/${id}`)
            .then(resp => resp.json())
            .then(data => data.map(d => new Cursus(d.id, d.label, new Section(d.section.id, d.section.label))))
            .then(cursus => this.cursus = cursus)
    }

    onModeChange(mode) {
        this.mode = mode
    }

    handleSubmit(data) {
        switch (data.length) {
            case 2:
                this.handleSignIn(...data.values())
                break
            case 5:
            case 6:
                this.handleSignUp(...data.values())
                break
        }
    }

    handleSignUp(lastname, firstname, email, sectionId, cursusId, password) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (lastname === '') {
            this.handleErrorMessage('Le champ \"Nom de famille\" est obligatoire')
            return
        }
        if (firstname === '') {
            this.handleErrorMessage('Le champ \"Prénom\" est obligatoire')
            return
        }
        if (email === '') {
            this.handleErrorMessage('Le champ \"Adresse mail\" est obligatoire')
            return
        }
        if (!email.match(emailRegex)) {
            this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return
        }
        if (sectionId === '') {
            this.handleErrorMessage('Le champ \"Section\" est obligatoire')
            return
        }
        if (cursusId === '') {
            this.handleErrorMessage('Le champ \"Cursus\" est obligatoire')
            return
        }
        if (password === '') {
            this.handleErrorMessage('Le champ \"Mot de passe\" est obligatoire')
            return
        }
        this.signUp(lastname, firstname, email, sectionId, cursusId, password)
            .then(data => data.error ? this.handleErrorMessage(data.message) : this.handleSignIn(email, password))
    }

    handleSignIn(email, password) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (email === '') {
            this.handleErrorMessage('Le champ \"Adresse mail\" est obligatoire')
            return
        }
        if (!email.match(emailRegex)) {
            this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return
        }
        if (password === '') {
            this.handleErrorMessage('Le champ \"Mot de passe\" est obligatoire')
            return
        }

        this.signIn(email, password)
            .then(data => data.error ? this.handleErrorMessage(data.message) : sessionStore.user = data)

    }

    signUp(lastname, firstname, email, sectionId, cursusId, password) {
        let data = JSON.stringify({
            lastname: lastname,
            firstname: firstname,
            email: email,
            sectionId: sectionId,
            cursusId: cursusId,
            password: password
        })
        return fetch(`${config.ApiUrl}/User/SignUp`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
    }

    signIn(email, password) {
        let data = JSON.stringify({email: email, password: password})
        return fetch(`${config.ApiUrl}/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
    }

    handleErrorMessage(message) {
        this.open = true
        this.errorMessage = message

        setTimeout(() => {
            this.open = false
        }, 2500)
    }
}

export const authStore = new AuthStore()