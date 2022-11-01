import DisplayForm from "./DisplayForm";
import InputForm from "../molecules/InputForm";
import RedirectLink from "../molecules/RedirectLink";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayProviders from "./DisplayProviders";
import DisplayProvider from "../molecules/DisplayProvider";
import HalfInputForm from "../molecules/HalfInputForm";
import HalfSelectInputForm from "../molecules/HalfSelectInputForm";
import RightImage from '../../assets/images/tired.png'
import GoogleProviderImg from "../../assets/icons/icons8-logo-google-100.png";
import FacebookProviderImg from "../../assets/icons/icons8-facebook-nouveau-100.png";

export default function SignUp({handleSubmit, handleType, handleChange, hiddenValue, disablePassword}) {
    return (
        <div className={'auth-grid'}>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <LockOutlinedIcon className={'icon-auth'}/>
                    <h1 className={'title-auth'}>CREATION DE COMPTE</h1>
                </div>
                <DisplayForm handleSubmit={handleSubmit} hiddenInput={hiddenValue} disablePassword={disablePassword}
                             inputs={[
                                 <HalfInputForm id={'lastname'} label={'Nom de famille'}/>,
                                 <HalfInputForm id={'firstname'} label={'Prénom'}/>,
                                 <InputForm id={'email'} label={'Adresse mail'}/>,
                                 <HalfSelectInputForm id={'section'} label={'Section'} handleChange={handleChange}
                                                      inputs={['Economique', 'Technique']}/>,
                                 <HalfSelectInputForm id={'cursus'} label={'Cursus'} handleChange={handleChange}
                                                      inputs={['Sécurité des systèmes', 'Développement d\'applications']}/>,
                                 <InputForm id={'password'} label={'Mot de passe'}/>,
                                 <input type={'submit'} className={'btn-auth'} value={'CREER MON COMPTE'}/>
                             ]}/>
                <RedirectLink message={'Déjà de compte ?'} label={'Connectez-vous !'} handleType={handleType}/>
                <p className={'word-auth'}>OU</p>
                <DisplayProviders providers={[
                    <DisplayProvider imageUrl={GoogleProviderImg}
                                     alt={'google'}/>,
                    <DisplayProvider imageUrl={FacebookProviderImg}
                                     alt={'facebook'}/>,
                ]}/>
            </div>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={RightImage} alt={'students'} className={'hero-banner-img'}/>
            </div>
        </div>
    )
    /*return (
        <div>
            <div className={'rectangle-auth-creation'}>
                <p className={'word-auth'}>OU</p>
                <DisplayForm handleSubmit={handleSubmit} hiddenInput={hiddenValue} disablePassword={disablePassword} inputs={[
                    <HalfInputForm id={'lastname'} label={'Nom de famille'}/>,
                    <HalfInputForm id={'firstname'} label={'Prénom'}/>,
                    <InputForm id={'email'} label={'Adresse mail'}/>,
                    <HalfSelectInputForm id={'section'} label={'Section'} handleChange={handleChange}
                                         inputs={['Economique', 'Technique']}/>,
                    <HalfSelectInputForm id={'cursus'} label={'Cursus'} handleChange={handleChange}
                                         inputs={['Sécurité des systèmes', 'Développement d\'applications']}/>,
                    <InputForm id={'password'} label={'Mot de passe'}/>,
                    <input type={'submit'} className={'btn-auth'} value={'CREER MON COMPTE'}/>
                ]}/>
                <RedirectLink label={'SE CONNECTER'} handleType={handleType}/>
            </div>
            <div className={'rectangle-providers-creation'}>
                <LockOutlinedIcon className={'icon-auth'}/>
                <h1 className={'title-auth'}>CREATION DE COMPTE</h1>
                <DisplayProviders providers={[
                    <DisplayProvider imageUrl={"https://img.icons8.com/fluency/48/000000/google-logo.png"}
                                     alt={'google'}/>,
                    <DisplayProvider imageUrl={"https://img.icons8.com/color/48/000000/facebook-new.png"}
                                     alt={'facebook'}/>,
                ]}/>
            </div>
        </div>
    )*/
}