import React, {useEffect} from "react";
import {sessionStore} from "../../stores/SessionStore";
import {requestsStore} from "../../stores/RequestsStore";
import {observer} from "mobx-react";
import {ObservedNavBar} from "../templates/NavBar";
import {ObservedSnackBar} from "../molecules/SnackBar";
import {ObservedRequestsContent} from "../templates/RequestsContent";
import {ObservedRequestForm} from "../templates/RequestForm";

function Requests() {
    useEffect(() => {
        requestsStore.init();
    }, [sessionStore.user])

    const handleSubmitRequest = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        console.log('request')
        console.log([...data.values()])
    }

    const handleSubmitAddress = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        requestsStore.addAddress([...data.values()])
    }

    const handleAccept = (id) => {
        requestsStore.handleAccept(id)
    }

    const handleChangeMode = () => {
        requestsStore.changeMode()
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
                <ObservedRequestForm handleSubmitRequest={handleSubmitRequest} handleSubmitAddress={handleSubmitAddress}/>
                <ObservedSnackBar open={requestsStore.open} message={requestsStore.message} severity={requestsStore.severity}/>
            </div>
        )
    }
}

export const ObservedRequests = observer(Requests)