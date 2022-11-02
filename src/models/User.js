export default class User {
    username
    email
    token

    constructor(username, email, token) {
        this.username = username
        this.email = email
        this.token = token
    }
}