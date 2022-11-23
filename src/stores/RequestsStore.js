import {makeAutoObservable} from "mobx";
import {sessionStore} from "./SessionStore";
import {api} from "../repositories/Api";
import Place from "../models/Place";
import Cursus from "../models/Cursus";
import Course from "../models/Course";
import Section from "../models/Section";
import Request from "../models/Request";

class RequestsStore {
    _requests = []
    _places = []
    _courses = []

    _open = false
    _popup = false
    _message = undefined
    _severity = 'error'

    _mode = true

    constructor() {
        makeAutoObservable(this)
    }

    get places() {
        return this._places
    }

    set places(data) {
        this._places = data.map(place => {
            return new Place(place.id, place.street, place.postalCode, place.number, place.locality)
        })
    }

    get courses() {
        return this._courses
    }

    set courses(data) {
        this._courses = data.map(course => {
            return new Course(course.id, course.label, new Cursus(course.cursus.id, course.cursus.label, new Section(course.cursus.section.id, course.cursus.section.label)))
        })
    }

    get requests() {
        return this._requests
    }

    set requests(data) {
        this._requests = data.map(request => {
            return new Request(
                request.id,
                request.name,
                request.description,
                request.date,
                request.status,
                request.sender,
                new Place(request.place.id, request.place.street, request.place.postalCode, request.place.number, request.place.locality),
                new Course(request.course.id, request.course.label, new Cursus(request.course.cursus.id, request.course.cursus.label, new Section(request.course.cursus.section.id, request.course.cursus.section.label)))
            )
        })
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

    set open(open) {
        this._open = open
    }

    get message() {
        return this._message
    }

    set message(message) {
        this._message = message
    }

    get mode() {
        return this._mode
    }

    set mode(mode) {
        this._mode = mode
    }

    get popup() {
        return this._popup
    }

    set popup(popup) {
        this._popup = popup
    }

    init() {
        this.loadRequests()
        this.loadPlaces()
        this.loadCourses()
    }

    loadRequests() {
        api.fetchRequests(sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    }
                } else {
                    this.requests = data
                }
            })
    }

    loadPlaces() {
        api.fetchPlaces(sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    }
                } else {
                    this.places = data
                }
            })
    }

    loadCourses() {
        api.fetchCourses(sessionStore.user.cursusId)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    }
                } else {
                    this.courses = data
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

    changeMode() {
        this.mode = !this.mode
    }

    handleAccept(id) {
        api.acceptRequest(id, sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    } else {
                        this.handleErrorMessage(data.error)
                    }
                } else {
                    this.handleSuccessMessage(data.message)
                    this.loadRequests()
                }
            })
    }

    openPopup() {
        this.popup = true
    }

    closePopup() {
        this.popup = false
    }

    addAddress(data) {
        this.handleAddAddress(...data.values())
    }

    handleAddAddress(street, number, postalCode, locality) {
        const regex = /^[0-9]{1,4}[a-zA-Z]?$/
        if (street === '') {
            this.handleErrorMessage('Le champ "Rue" est obligatoire')
            return
        }

        if (number === '') {
            this.handleErrorMessage('Le champ "Numéro" est obligatoire')
            return
        }

        if (!number.match(regex)) {
            this.handleErrorMessage('Veuillez entrer un numéro de rue valide')
            return
        }

        if (postalCode === '') {
            this.handleErrorMessage('Le champ "Code postal" est obligatoire')
            return
        }

        if (locality === '') {
            this.handleErrorMessage('Le champ "Localité" est obligatoire')
            return
        }

        api.addAddress(street, number, postalCode, locality, sessionStore.user.token)
            .then(data => {
                debugger
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    } else {
                        this.handleErrorMessage(data.message)
                    }
                } else {
                    this.handleSuccessMessage(data.message)
                    this.loadPlaces()
                    this.closePopup()
                }
            })
    }
}

export const requestsStore = new RequestsStore()