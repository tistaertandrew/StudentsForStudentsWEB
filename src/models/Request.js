export default class Request {
    id
    name
    description
    date
    status
    sender
    handler
    place
    course

    constructor(id, name, description, date, status, sender, handler, place, course) {
        this.id = id
        this.name = name
        this.description = description
        this.date = date
        this.status = status
        this.sender = sender
        this.handler = handler
        this.place = place
        this.course = course
    }
}