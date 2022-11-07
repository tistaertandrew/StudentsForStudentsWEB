export default class User {
    _username
    _email
    _token

    constructor(username, email, token) {
        this.username = username
        this.email = email
        this.token = token
    }

    set username(username) {
        this._username = username
    }

    get username() {
        return this._username
    }

    set email(email) {
        this._email = email
    }

    get email() {
        return this._email
    }

    get lastname() {
        let index = this.username.search(' ')
        return this.username.substring(0, index)
    }

    get firstname() {
        let index = this.username.search(' ')
        return this.username.substring(index + 1, this._username.length)
    }

    set token(token) {
        this._token = token
    }

    get token() {
        return this._token
    }
}