import {observer} from "mobx-react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayForm from "../organisms/DisplayForm";
import HalfInputForm from "../molecules/HalfInputForm";
import InputForm from "../molecules/InputForm";
import HalfSelectInputForm from "../molecules/HalfSelectInputForm";
import {authStore} from "../../stores/AuthStore";
import RedirectLink from "../molecules/RedirectLink";
import RightImage from '../../assets/images/students.png'
import HiddenInputForm from "../molecules/HiddenInputForm";

function SignUpProvider({handleSubmit}) {
    return (
        <div className={'auth-grid'}>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <LockOutlinedIcon className={'icon-auth'}/>
                    <h1 className={'title-auth'}>Authentification externe réussie !</h1>
                    <h2 className={'text-auth'}>Encore quelques informations...</h2>
                </div>
                <DisplayForm handleSubmit={handleSubmit}
                             inputs={[
                                 <HalfInputForm id={'lastname'} label={'Nom de famille'}/>,
                                 <HalfInputForm id={'firstname'} label={'Prénom'}/>,
                                 <InputForm id={'email'} label={'Adresse mail'} disabled={true} value={authStore.emailProvider}/>,
                                 <HiddenInputForm id={'email'} value={authStore.emailProvider}/>,
                                 <HalfSelectInputForm id={'section'} label={'Section *'}
                                                      handleChange={(e) => authStore.loadCursus(e.target.value)}
                                                      inputs={authStore.sections}/>,
                                 <HalfSelectInputForm id={'cursus'} label={'Cursus *'}
                                                      inputs={authStore.cursus}/>,
                                 <input type={'submit'} className={'btn-auth'} value={'CREER MON COMPTE'}/>
                             ]}/>
                <RedirectLink message={'Déjà de compte ?'} label={'Connectez-vous !'}
                              handleMode={() => authStore.onModeChange('signin')}/>
            </div>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={RightImage} alt={'students'} className={'hero-banner-img'}/>
            </div>
        </div>
    )
}

export const ObservedSignUpProvider = observer(SignUpProvider)