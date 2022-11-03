import NavBar from "../organisms/NavBar";
import {ObservedSignIn} from "../organisms/SignIn";
import {authStore} from "../../stores/AuthStore";
import {observer} from "mobx-react";
import {ObservedSignUp} from "../organisms/SignUp";
import {ObservedSnackBar} from "../molecules/SnackBar";
import {sessionStore} from "../../stores/SessionStore";
import {useNavigate} from "react-router-dom";
import routes from '../../routes.json'
import {useEffect} from "react";
import {ObservedSignUpProvider} from "../organisms/SignUpProvider";

function Authentication() {
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStore.user) navigate(routes.Home)
    }, [sessionStore.user])

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        //console.log([...data.values()])
        authStore.handleSubmit([...data.values()])
    }

    if (authStore.mode === 'signin') {
        return (
            <div>
                <NavBar/>
                <ObservedSignIn handleSubmit={handleSubmit}/>
                <ObservedSnackBar open={authStore.open} message={authStore.errorMessage}/>
            </div>
        )
    }
    if (authStore.mode === 'signup') {
        return (
            <div>
                <NavBar/>
                <ObservedSignUp handleSubmit={handleSubmit}/>
                <ObservedSnackBar open={authStore.open} message={authStore.errorMessage}/>
            </div>
        )
    }

    if(authStore.mode === 'provider') {
        return (
            <div>
                <NavBar/>
                <ObservedSignUpProvider handleSubmit={handleSubmit}/>
                <ObservedSnackBar open={authStore.open} message={authStore.errorMessage}/>
            </div>
        )
    }
}

export const ObservedAuthentication = observer(Authentication)