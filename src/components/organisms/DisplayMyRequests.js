import DisplayRequest from "../molecules/DisplayRequest";
import EmptyContent from "../molecules/EmptyContent";
import DisplayMyRequest from "../molecules/DisplayMyRequest";

export default function DisplayMyRequests({requests, onDelete}) {
    const handleDelete = (id) => {
        onDelete(id)
    }

    if(requests.length === 0) {
        return (
            <EmptyContent message={'Vous n\'avez créé ou accepté aucune demande'}/>
        )
    }

    return (
        <div className={'requests-container'}>
            {requests.map((request) => <DisplayMyRequest id={request.id} name={request.name} sender={request.sender}
                                                       date={request.date} handler={request.handler}
                                                       course={request.course.content} place={request.place.content}
                                                       status={request.status} description={request.description}
                                                       handleDelete={() => handleDelete(request.id)}/>)}
        </div>
    )
}