export default class Place {
    id
    street
    postalCode
    number
    locality

    constructor(id, street, postalCode, number, locality) {
        this.id = id
        this.street = street
        this.postalCode = postalCode
        this.number = number
        this.locality = locality
    }

    get content() {
        return `${this.street} ${this.number}, ${this.postalCode} ${this.locality}`
    }
}