export default class User {
    username
    email
    token

    constructor(username, email, token) {
        this.username = username
        this.email = email
        this.token = token
    }

    get lastname() {
        let index = this.username.search(' ')
        return this.username.substring(0, index)
    }

    get firstname() {
        let index = this.username.search(' ')
        return this.username.substring(index + 1, this.username.length)
    }
}