import {observer} from "mobx-react";
import {requestsStore} from "../../stores/RequestsStore";
import React from "react";
import DisplayRequests from "../organisms/DisplayRequests";

function RequestsContent({handleAccept, handleChangeMode}) {
    const onAccept = (id) => {
        handleAccept(id)
    }

    return (
        <div className={'requests'}>
            <h1 className={'file-title'}>Liste des demandes disponibles</h1>
            <DisplayRequests requests={requestsStore.requests} onAccept={onAccept}/>
            <input type={'submit'} className={'files__add'} value={'AJOUTER UNE DEMANDE'} onClick={handleChangeMode}/>
        </div>
    )
}

export const ObservedRequestsContent = observer(RequestsContent)