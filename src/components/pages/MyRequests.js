import {ObservedNavBar} from "../templates/NavBar";
import {ObservedSnackBar} from "../molecules/SnackBar";
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {sessionStore} from "../../stores/SessionStore";
import {myRequestsStore} from "../../stores/MyRequestsStore";
import {ObservedMyRequestsContent} from "../templates/MyRequestsContent";

function MyRequests() {
    useEffect(() => {
        myRequestsStore.init();
    }, [sessionStore.user])

    const handleDelete = (id) => {
        myRequestsStore.handleDelete(id)
    }

    const handleFilterRequests = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        myRequestsStore.filterRequests([...data.values()])
    }

    const handleResetFilter = () => {
        myRequestsStore.resetFilter()
    }

    return (
        <div>
            <ObservedNavBar/>
            <ObservedMyRequestsContent handleDelete={handleDelete}
                                       handleResetFilter={handleResetFilter}
                                       handleFiltrerRequests={handleFilterRequests}/>
            <ObservedSnackBar open={myRequestsStore.open} message={myRequestsStore.message}
                              severity={myRequestsStore.severity}/>
        </div>
    )
}

export const ObservedMyRequests = observer(MyRequests)