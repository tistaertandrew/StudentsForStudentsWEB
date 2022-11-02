import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputForm from "../molecules/InputForm";
import RedirectLink from "../molecules/RedirectLink";
import DisplayForm from "./DisplayForm";
import DisplayProviders from "./DisplayProviders";
import LeftImage from '../../assets/images/peace.png'
import config from '../../config.json'
import DisplayGoogleProvider from "../molecules/DisplayGoogleProvider";
import {authStore} from "../../stores/AuthStore";
import {observer} from "mobx-react";

function SignIn({handleSubmit}) {
    const onSuccess = (response) => console.log('login succeed')
    const onError = () => console.log('login failed')

    return (
        <div className={'auth-grid'}>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={LeftImage} alt={'students'} className={'hero-banner-img'}/>
            </div>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <LockOutlinedIcon className={'icon-auth'}/>
                    <h1 className={'title-auth'}>CONNEXION</h1>
                </div>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <InputForm id={'email'} label={'Adresse mail'}/>,
                    <InputForm id={'password'} label={'Mot de passe'}/>,
                    <input type={'submit'} className={'btn-auth'} value={'SE CONNECTER'}/>
                ]}/>
                <RedirectLink message={'Pas de compte ?'} label={'Inscrivez-vous !'}
                              handleMode={() => authStore.onModeChange()}/>
                <p className={'word-auth'}>OU</p>
                <DisplayProviders providers={[
                    <DisplayGoogleProvider clientId={config.GoogleClientID} onSuccess={onSuccess} onError={onError}/>
                ]}/>
            </div>
        </div>
    )
}

export const ObservedSignIn = observer(SignIn)