import DisplayRequest from "../molecules/DisplayRequest";
import EmptyContent from "../molecules/EmptyContent";

export default function DisplayRequests({requests, onAccept}) {
    const handleAccept = (id) => {
        onAccept(id)
    }

    if(requests.length === 0) {
        return (
            <EmptyContent message={'Aucune demande disponible'}/>
        )
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