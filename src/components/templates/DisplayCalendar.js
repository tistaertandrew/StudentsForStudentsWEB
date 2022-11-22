import {observer} from "mobx-react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import "../../style/calendar.css";
import moment from "moment";
import "moment/locale/fr";

function DisplayCalendar({rowCalendar}) {
    const calendar = rowCalendar.split('\r\n')
    const localizer = momentLocalizer(moment)
    const events = []
    calendar.forEach((row, index) => {
        if (row.includes('SUMMARY')) {
            events.push({
                title: row.split(':')[1],
                start: moment(calendar[index - 3].split(':')[1], 'YYYYMMDDTHHmmss').add(1, 'hours').toDate(),
                end: moment(calendar[index - 5].split(':')[1], 'YYYYMMDDTHHmmss').add(1, 'hours').toDate()
            })
        }
    })
    return (
        <div style={{height: 'calc(100vh - 110px)', margin: '10px'}}>
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" defaultView="week"
                      messages={{
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