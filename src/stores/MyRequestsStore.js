import {makeAutoObservable} from "mobx";
import Request from "../models/Request";
import Place from "../models/Place";
import Course from "../models/Course";
import Cursus from "../models/Cursus";
import Section from "../models/Section";
import {sessionStore} from "./SessionStore";
import {api} from "../repositories/Api";

class MyRequestsStore {
    _myRequests = []
    _courses = []

    _open = false
    _filterPopup = false
    _message = undefined
    _severity = 'error'

    constructor() {
        makeAutoObservable(this)
    }

    get myRequests() {
        return this._myRequests
    }

    set myRequests(data) {
        this._myRequests = data.map(myRequest => {
            return new Request(
                myRequest.id,
                myRequest.name,
                myRequest.description,
                myRequest.date,
                myRequest.status,
                myRequest.sender,
                myRequest.handler,
                new Place(myRequest.place.id, myRequest.place.street, myRequest.place.postalCode, myRequest.place.number, myRequest.place.locality),
                new Course(myRequest.course.id, myRequest.course.label, new Cursus(myRequest.course.cursus.id, myRequest.course.cursus.label, new Section(myRequest.course.cursus.section.id, myRequest.course.cursus.section.label)))
            )
        })
    }

    set courses(data) {
        this._courses = data.map(course => {
            return new Course(course.id, course.label, new Cursus(course.cursus.id, course.cursus.label, new Section(course.cursus.section.id, course.cursus.section.label)))
        })
    }

    get courses() {
        return this._courses
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

    get filterPopup() {
        return this._filterPopup
    }

    set filterPopup(filterPopup) {
        this._filterPopup = filterPopup
    }

    get message() {
        return this._message
    }

    set message(message) {
        this._message = message
    }

    init() {
        this.loadMyRequests()
        this.loadCourses()
    }

    loadMyRequests() {
        api.fetchRequests(true, sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    }
                } else {
                    this.myRequests = data
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

    openFilterPopup() {
        this.filterPopup = true
    }

    closeFilterPopup() {
        this.filterPopup = false
    }

    filterRequests(data) {
        let id = parseInt([...data.values()][0])
        if (isNaN(id)) {
            this.handleErrorMessage('Le champ "Cours concerné" est obligatoire')
            return
        }
        api.fetchRequests(true, sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    }
                } else {
                    this.myRequests = data
                    this.myRequests = this.myRequests.filter(request => request.course.id === id)
                    this.closeFilterPopup()
                }
            })
    }

    resetFilter() {
        api.fetchRequests(true, sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    }
                } else {
                    this.myRequests = data
                    this.closeFilterPopup()
                }
            })
    }

    handleDelete(id) {
        api.deleteRequest(id, sessionStore.user.token)
            .then(data => {
                if(data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    } else {
                        this.handleErrorMessage(data.message)
                    }
                } else {
                    this.handleSuccessMessage(data.message)
                }
            })
    }
}

export const myRequestsStore = new MyRequestsStore()