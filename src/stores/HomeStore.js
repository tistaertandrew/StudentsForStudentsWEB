import {makeAutoObservable} from "mobx";
import {api} from "../repositories/Api";

class HomeStore {
    _usersCount = 0;
    _filesCount = 0;

    constructor() {
        makeAutoObservable(this)
    }

    get usersCount() {
        return this._usersCount
    }

    set usersCount(data) {
        this._usersCount = data
    }

    get filesCount() {
        return this._filesCount
    }

    set filesCount(data) {
        this._filesCount = data
    }

    init() {
        api.fetchUsersCount()
            .then(data => {
                this.usersCount = data
            })
        api.fetchFilesCount()
            .then(data => {
                this.filesCount = data
            })
    }
}

export const homeStore = new HomeStore()