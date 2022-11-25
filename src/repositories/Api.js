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
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
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

    fetchCoursesByCursusId(cursusId) {
        return fetch(`${this.base}/School/Courses/${cursusId}`)
            .then(resp => resp.json())
    }

    fetchCalendar(token) {
        return fetch(`${this.base}/Calendar`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
    }

    updateCalendarLink(token, link) {
        return fetch(`${this.base}/User/${link}`, {
            method: 'PUT',
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
    }

    fetchRequests(type, token) {
        return fetch(`${this.base}/Request/${type}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
    }

    fetchPlaces(token) {
        return fetch(`${this.base}/Place`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
    }

    fetchCourses(cursusId) {
        return fetch(`${this.base}/School/Courses/${cursusId}`)
            .then(resp => resp.json())
        
    }

    acceptRequest(id, token) {
        return fetch(`${this.base}/Request/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
    }

    deleteRequest(id, token) {
        debugger
        return fetch(`${this.base}/Request/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
    }

    addAddress(street, number, postalCode, locality, token) {
        let data = JSON.stringify({
            street: street,
            number: number,
            postalCode: postalCode,
            locality: locality
        })
        return fetch(`${this.base}/Place`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
    }

    submitRequest(name, placeId, courseId, description, token) {
        let data = JSON.stringify({
            name: name,
            placeId: placeId,
            courseId: courseId,
            description: description
        })
        return fetch(`${this.base}/Request`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
    }

    fetchUsersCount() {
        return fetch(`${this.base}/User/Count`)
            .then(resp => resp.json())
    }

    fetchFilesCount() {
        return fetch(`${this.base}/File/Count`)
            .then(resp => resp.json())
    }
}

export const api = new Api()