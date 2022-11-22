import {observer} from "mobx-react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/fr";

function DisplayCalendar({rowCalendar}) {
    const localizer = momentLocalizer(moment)
    const events = [
        {
            title: "Big Meeting",
            start: new Date("2022-11-22:08:00"),
            end: new Date("2022-11-22:10:00"),
        },
        {
            title: "Vacation",
            start: new Date(2021, 6, 7),
            end: new Date(2021, 6, 10),
        },
        {
            title: "Conference",
            start: new Date(2021, 6, 20),
            end: new Date(2021, 6, 23),
        },
    ];
    return (
        <div>
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" messages={{
                next: "Suivant",
                previous: "Précédent",
                today: "Aujourd'hui",
                month: "Mois",
                week: "Semaine",
                day: "Jour",
                agenda: "Agenda",
                date: "Date",
            }}/>
        </div>
    )
}

export const ObservedDisplayCalendar = observer(DisplayCalendar)