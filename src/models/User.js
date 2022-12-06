export default class User {
    _username
    _email
    _token
    _cursusId

    _isAdmin
    _isBanned

    constructor(username, email, token, cursusId, isAdmin, isBanned) {
        this.username = username
        this.email = email
        this.token = token
        this.cursusId = cursusId
        this.isAdmin = isAdmin
        this.isBanned = isBanned
    }

    set cursusId(cursusId) {
        this._cursusId = cursusId
    }

    get cursusId() {
        return this._cursusId
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

    get isAdmin() {
        return this._isAdmin
    }

    set isAdmin(isAdmin) {
        this._isAdmin = isAdmin
    }

    get isBanned() {
        return this._isBanned
    }

    set isBanned(isBanned) {
        this._isBanned = isBanned
    }
}