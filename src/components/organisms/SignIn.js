import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputForm from "../molecules/InputForm";
import RedirectLink from "../molecules/RedirectLink";
import DisplayForm from "./DisplayForm";
import DisplayProviders from "./DisplayProviders";
import DisplayProvider from "../molecules/DisplayProvider";
import LeftImage from '../../assets/images/students.png'
import GoogleProviderImg from '../../assets/icons/icons8-logo-google-100.png'
import FacebookProviderImg from '../../assets/icons/icons8-facebook-nouveau-100.png'
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

export default function SignIn({handleSubmit, handleType}) {
    const ProviderResponse = (response) => {
        console.log(response)
    }

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
                <RedirectLink message={'Pas de compte ?'} label={'Inscrivez-vous !'} handleType={handleType}/>
                <p className={'word-auth'}>OU</p>
                <DisplayProviders providers={[
                    <DisplayProvider imageUrl={GoogleProviderImg}
                                     alt={'google'}/>,
                    <DisplayProvider imageUrl={FacebookProviderImg}
                                     alt={'facebook'}/>,
                ]}/>
            </div>
        </div>
    )
}