import DisplayRequest from "../molecules/DisplayRequest";

export default function DisplayRequests({requests, onAccept}) {
    const handleAccept = (id) => {
        onAccept(id)
    }
    return (
        <div className={'requests-container'}>
            {requests.map((request) => <DisplayRequest id={request.id} name={request.name} sender={request.sender}
                                                       date={request.date}
                                                       course={request.course.content} place={request.place.content}
                                                       status={request.status} description={request.description}
                                                       handleAccept={() => handleAccept(request.id)}/>)}
        </div>
    )
}