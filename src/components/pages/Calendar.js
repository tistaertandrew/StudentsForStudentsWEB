import {observer} from "mobx-react";
import {ObservedNavBar} from "../templates/NavBar";
import {ObservedSnackBar} from "../molecules/SnackBar";
import {calendarStore} from "../../stores/CalendarStore";
import {sessionStore} from "../../stores/SessionStore";
import {useEffect} from "react";
import LoadingMessage from "../molecules/LoadingMessage";
import {ObservedLinkUpdate} from "../templates/LinkUpdate";
import {ObservedDisplayCalendar} from "../templates/DisplayCalendar";

function Calendar() {
    useEffect(() => {
        calendarStore.loadCalendar()
    }, [sessionStore.user])

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        calendarStore.handleSubmit([...data.values()])
    }

    if(calendarStore.isLoading) {
        return (
            <div>
                <ObservedNavBar/>
                <LoadingMessage message={'Calendrier en cours de chargement...'}/>
                <ObservedSnackBar open={calendarStore.open} message={calendarStore.errorMessage} severity={'error'}/>
            </div>
        )
    }

    if(calendarStore.error) {
        return (
            <div>
                <ObservedNavBar/>
                <ObservedLinkUpdate handleSubmit={handleSubmit}/>
                <ObservedSnackBar open={calendarStore.open} message={calendarStore.errorMessage} severity={'error'}/>
            </div>
        )
    }

    if(!calendarStore.error) {
        return (
            <div>
                <ObservedNavBar/>
                <ObservedDisplayCalendar rowCalendar={calendarStore.calendar}/>
                <ObservedSnackBar open={calendarStore.open} message={calendarStore.errorMessage} severity={'error'}/>
            </div>
        )
    }
}

export const ObservedCalendar = observer(Calendar)