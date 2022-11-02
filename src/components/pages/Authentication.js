import NavBar from "../organisms/NavBar";
import {ObservedSignIn} from "../organisms/SignIn";
import {authStore} from "../../stores/AuthStore";
import {observer} from "mobx-react";
import {ObservedSignUp} from "../organisms/SignUp";

function Authentication() {

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        console.log([...data.values()])
    }

    if (authStore.mode) {
        return (
            <div>
                <NavBar/>
                <ObservedSignIn handleSubmit={handleSubmit}/>
            </div>
        )
    } else {
        return (
            <div>
                <NavBar/>
                <ObservedSignUp handleSubmit={handleSubmit}/>
            </div>
        )
    }
}

export const ObservedAuthentication = observer(Authentication)