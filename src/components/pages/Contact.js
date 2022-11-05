import {ObservedNavBar} from "../templates/NavBar";
import {contactStore} from "../../stores/ContactStore";
import {observer} from "mobx-react";
import {ObservedSnackBar} from "../molecules/SnackBar";
import {ObservedContactForm} from "../templates/ContactForm";

function Contact() {
    const handleSubmit = (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget)
        contactStore.handleSubmit([...data.values()])
    }

    return(
        <div>
            <ObservedNavBar/>
            <ObservedContactForm handleSubmit={handleSubmit}/>
            <ObservedSnackBar open={contactStore.open} message={contactStore.message} severity={contactStore.severity}/>
        </div>
    )
}

export const ObservedContact = observer(Contact)