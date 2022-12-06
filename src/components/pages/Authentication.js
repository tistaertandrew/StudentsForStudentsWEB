import {ObservedNavBar} from "../templates/NavBar";
import {ObservedSignIn} from "../templates/SignIn";
import {authStore} from "../../stores/AuthStore";
import {observer} from "mobx-react";
import {ObservedSignUp} from "../templates/SignUp";
import {ObservedSnackBar} from "../molecules/SnackBar";
import {sessionStore} from "../../stores/SessionStore";
import {useNavigate} from "react-router-dom";
import routes from '../../routes.json'
import {useEffect} from "react";
import {ObservedSignUpProvider} from "../templates/SignUpProvider";

function Authentication() {
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStore.user) navigate(routes.Home)
        authStore.onModeChange('signin')
    }, [sessionStore.user])

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        authStore.handleSubmit([...data.values()])
    }

    if (authStore.mode === 'signin') {
        return (
            <div>
                <ObservedNavBar/>
                <ObservedSignIn handleSubmit={handleSubmit}/>
                <ObservedSnackBar open={authStore.open} message={authStore.errorMessage} severity={authStore.severity}/>
            </div>
        )
    }
    if (authStore.mode === 'signup') {
        return (
            <div>
                <ObservedNavBar/>
                <ObservedSignUp handleSubmit={handleSubmit}/>
                <ObservedSnackBar open={authStore.open} message={authStore.errorMessage} severity={authStore.severity}/>
            </div>
        )
    }

    if(authStore.mode === 'provider') {
        return (
            <div>
                <ObservedNavBar/>
                <ObservedSignUpProvider handleSubmit={handleSubmit}/>
                <ObservedSnackBar open={authStore.open} message={authStore.errorMessage} severity={authStore.severity}/>
            </div>
        )
    }
}

export const ObservedAuthentication = observer(Authentication)