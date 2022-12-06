import {makeAutoObservable} from "mobx";
import {api} from '../repositories/Api'

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
        this.handleContact(...data.values())
    }

    handleContact(lastname, firstname, email, subject, message) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(lastname === '') {
            this.handleErrorMessage('Le champ "Nom de famille" est obligatoire')
            return
        }
        if(firstname === '') {
            this.handleErrorMessage('Le champ "Prénom" est obligatoire')
            return
        }
        if(email === '') {
            this.handleErrorMessage('Le champ "Adresse mail" est obligatoire')
            return
        }
        if(!email.match(emailRegex)) {
            this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return
        }
        if(subject === '') {
            this.handleErrorMessage('Le champ "Sujet" est obligatoire')
            return
        }
        if(message === '') {
            this.handleErrorMessage('Le champ "Message" est obligatoire')
            return
        }

        api.sendContactForm(lastname, firstname, email, subject, message)
            .then(data => data.error ? this.handleErrorMessage(data.message) : this.handleSuccessMessage(data.message))
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

export const contactStore = new ContactStore()