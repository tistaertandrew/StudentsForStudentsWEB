import {useEffect} from "react";
import {gapi} from "gapi-script";
import GoogleLogo from "../../assets/icons/icons8-logo-google-100.png";
import GoogleLogin from "react-google-login";

export default function DisplayGoogleProvider({clientId, onSuccess, onError}) {
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        }
        gapi.load('client:auth2', initClient)
    })

    const RenderButton = (renderProps) => {
        return <img src={GoogleLogo} alt={'google'} className={'provider'} onClick={renderProps.onClick}/>
    }

    return (
        <GoogleLogin clientId={clientId} buttonText={'Google'} onSuccess={onSuccess} onFailure={onError}
                     render={(renderProps) => RenderButton(renderProps)}/>
    )
}