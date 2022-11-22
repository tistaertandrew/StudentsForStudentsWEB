import {makeAutoObservable} from "mobx";
import {sessionStore} from "./SessionStore";
import {api} from '../repositories/Api'

class CalendarStore {
    _calendar = undefined
    _isLoading = false
    _errorMessage = undefined
    _open = false
    _error = true

    constructor() {
        makeAutoObservable(this)
    }

    get calendar() {
        return this._calendar
    }

    set calendar(data) {
        this._calendar = data
    }

    get isLoading() {
        return this._isLoading
    }

    set isLoading(data) {
        this._isLoading = data
    }

    get errorMessage() {
        return this._errorMessage
    }

    set errorMessage(data) {
        this._errorMessage = data
    }

    get open() {
        return this._open
    }

    set open(data) {
        this._open = data
    }

    get error() {
        return this._error
    }

    set error(data) {
        this._error = data
    }

    loadCalendar() {
        this.isLoading = true
        api.fetchCalendar(sessionStore.user.token)
            .then(data => {
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    } else {
                        this.handleErrorMessage(data.message)
                        this.error = true
                        this.isLoading = false
                    }
                } else {
                    this.calendar = data
                    this.error = false
                    this.isLoading = false
                }
            })
    }

    handleErrorMessage(message) {
        this._errorMessage = message
        this.open = true

        setTimeout(() => {
            this.open = false
        }, 2500)
    }

    handleSubmit(data) {
        this.updateLink(...data.values())
    }

    updateLink(link) {
        if(link === '') {
            this.handleErrorMessage('Le champ "Lien horairix" est obligatoire')
            return
        }
        this.isLoading = true
        api.updateCalendarLink(sessionStore.user.token, encodeURIComponent(link))
            .then(data => {
                if (data.error) {
                    if (data.unauthorized) {
                        sessionStore.logout()
                    }
                } else {
                    this.loadCalendar()
                }
            })
    }
}

export const calendarStore = new CalendarStore()