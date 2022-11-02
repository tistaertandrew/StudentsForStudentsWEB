import {makeAutoObservable} from "mobx";
import config from '../config.json'
import Section from "../models/Section";
import Cursus from "../models/Cursus";

class AuthStore {
    _sections = []
    _cursus = []
    _mode = true

    constructor() {
        makeAutoObservable(this)
        this.loadSections()
    }

    get mode() {
        return this._mode
    }

    get sections() {
        return this._sections
    }

    set sections(sections) {
        this._sections = sections
    }

    get cursus() {
        return this._cursus
    }

    set cursus(cursus) {
        this._cursus = cursus
    }

    loadSections() {
        fetch(`${config.UrlAPI}/Authentication/Sections`)
            .then(resp => resp.json())
            .then(data => data.map(d => new Section(d.id, d.label)))
            .then(sections => this.sections = sections)
    }

    loadCursus(id) {
        fetch(`${config.UrlAPI}/Authentication/Cursus/${id}`)
            .then(resp => resp.json())
            .then(data => data.map(d => new Cursus(d.id, d.label, new Section(d.section.id, d.section.label))))
            .then(cursus => this.cursus = cursus)
    }

    onModeChange() {
        this._mode = !this._mode
    }
}

export const authStore = new AuthStore()