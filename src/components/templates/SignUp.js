import DisplayForm from "../organisms/DisplayForm";
import InputForm from "../molecules/InputForm";
import RedirectLink from "../molecules/RedirectLink";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayProviders from "../organisms/DisplayProviders";
import HalfInputForm from "../molecules/HalfInputForm";
import HalfSelectInputForm from "../molecules/HalfSelectInputForm";
import RightImage from '../../assets/images/students.png'
import config from "../../config.json";
import DisplayGoogleProvider from "../molecules/DisplayGoogleProvider";
import {authStore} from "../../stores/AuthStore";
import {observer} from "mobx-react";

function SignUp({handleSubmit}) {
    return (
        <div className={'auth-grid'}>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <LockOutlinedIcon className={'icon-auth'}/>
                    <h1 className={'title-auth'}>CREATION DE COMPTE</h1>
                </div>
                <DisplayForm handleSubmit={handleSubmit}
                             inputs={[
                                 <HalfInputForm id={'lastname'} label={'Nom de famille'}/>,
                                 <HalfInputForm id={'firstname'} label={'Prénom'}/>,
                                 <InputForm id={'email'} label={'Adresse mail'}/>,
                                 <HalfSelectInputForm id={'section'} label={'Section *'}
                                                      handleChange={(e) => authStore.loadCursus(e.target.value)}
                                                      inputs={authStore.sections}/>,
                                 <HalfSelectInputForm id={'cursus'} label={'Cursus *'}
                                                      inputs={authStore.cursus}/>,
                                 <InputForm id={'password'} label={'Mot de passe'}/>,
                                 <InputForm id={'password'} label={'Confirmation du mot de passe'}/>,
                                 <input type={'submit'} className={'btn-auth'} value={'CREER MON COMPTE'}/>
                             ]}/>
                <RedirectLink message={'Déjà de compte ?'} label={'Connectez-vous !'}
                              handleMode={() => authStore.onModeChange('signin')}/>
                <p className={'word-auth'}>OU</p>
                <DisplayProviders providers={[
                    <DisplayGoogleProvider clientId={config.GoogleClientID} onSuccess={(response) => authStore.onSuccess(response)} onError={() => authStore.onError()}/>
                ]}/>
            </div>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={RightImage} alt={'students'} className={'hero-banner-img'}/>
            </div>
        </div>
    )
}

export const ObservedSignUp = observer(SignUp)