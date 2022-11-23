import React, {useEffect} from "react";
import {sessionStore} from "../../stores/SessionStore";
import {requestsStore} from "../../stores/RequestsStore";
import {observer} from "mobx-react";
import {ObservedNavBar} from "../templates/NavBar";
import {ObservedSnackBar} from "../molecules/SnackBar";
import {ObservedRequestsContent} from "../templates/RequestsContent";

function Requests() {
    useEffect(() => {
        requestsStore.init();
    }, [sessionStore.user])

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        // calendarStore.handleSubmit([...data.values()])
    }

    const handleAccept = (id) => {
        requestsStore.handleAccept(id)
    }

    const handleChangeMode = () => {
        //requestsStore.changeMode()
    }

    if(requestsStore.mode) {
        return(
            <div>
                <ObservedNavBar/>
                <ObservedRequestsContent handleAccept={handleAccept} handleChangeMode={handleChangeMode}/>
                <ObservedSnackBar open={requestsStore.open} message={requestsStore.message} severity={requestsStore.severity}/>
            </div>
        )
    }

    if(!requestsStore.mode) {
        return(
            <div>
                <ObservedNavBar/>
                <ObservedSnackBar open={requestsStore.open} message={requestsStore.message} severity={requestsStore.severity}/>
            </div>
        )
    }
}

export const ObservedRequests = observer(Requests)