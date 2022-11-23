export default class Course {
    id
    label
    cursus

    constructor(id, label, cursus) {
        this.id = id
        this.label = label
        this.cursus = cursus
    }

    get content() {
        return `${this.label}`
    }
}