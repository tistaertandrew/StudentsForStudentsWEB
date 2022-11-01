import DisplayForm from "./DisplayForm";
import InputForm from "../molecules/InputForm";
import RedirectLink from "../molecules/RedirectLink";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayProviders from "./DisplayProviders";
import HalfInputForm from "../molecules/HalfInputForm";
import HalfSelectInputForm from "../molecules/HalfSelectInputForm";
import RightImage from '../../assets/images/tired.png'
import config from "../../config.json";
import DisplayGoogleProvider from "../molecules/DisplayGoogleProvider";

export default function SignUp({handleSubmit, handleType, handleChange, hiddenValue, disablePassword}) {
    const onSuccess = (response) => {
        console.log(response)
        /*let data = JSON.stringify({credentials: response.tokenId})
        fetch("https://localhost:7091/Authentication/Google", {method: 'POST', body: data, headers: {'Content-Type': 'application/json'}})
            .then(resp => resp.json())
            .then(data => console.log(data))*/
    }

    const onError = () => console.log('login failed')

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
                    <DisplayGoogleProvider clientId={config.GoogleClientID} onSuccess={onSuccess} onError={onError}/>
                ]}/>
            </div>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={RightImage} alt={'students'} className={'hero-banner-img'}/>
            </div>
        </div>
    )
}