import config from '../config.json'

class Api {
    _base

    constructor() {
        this._base = config.ApiUrl
    }

    get base() {
        return this._base
    }

    set base(base) {
        this._base = base
    }

    loadSections() {
        return fetch(`${this.base}/School/Sections`)
            .then(resp => resp.json())
    }

    loadCursus(id) {
        return fetch(`${this.base}/School/Cursus/${id}`)
            .then(resp => resp.json())
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
        return fetch(`${this.base}/User/SignUp`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
    }

    signIn(email, password) {
        let data = JSON.stringify({
            email: email,
            password: password
        })
        return fetch(`${this.base}/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
    }

    signUpProvider(lastname, firstname, email, sectionId, cursusId) {
        let data = JSON.stringify({
            lastname: lastname,
            firstname: firstname,
            email: email,
            sectionId: sectionId,
            cursusId: cursusId
        })
        return fetch(`${this.base}/User/SignUp`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
    }

    signInProvider(email) {
        let data = JSON.stringify({
            email: email
        })
        return fetch(`${this.base}/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
    }

    handleProvider(credentials) {
        let data = JSON.stringify({
            credentials: credentials
        })
        return fetch(`${this.base}/User/Google`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
    }

    fetchUser(token) {
        return fetch(`${this.base}/User`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.json())
    }

    sendContactForm(lastname, firstname, email, message) {
        let data = JSON.stringify({
            lastname: lastname,
            firstname: firstname,
            email: email,
            message: message
        })
        return fetch(`${this.base}/Contact`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
    }
}

export const api = new Api()