import DisplayForm from "./DisplayForm";
import InputForm from "../molecules/InputForm";
import RedirectLink from "../molecules/RedirectLink";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayProviders from "./DisplayProviders";
import DisplayProvider from "../molecules/DisplayProvider";
import HalfInputForm from "../molecules/HalfInputForm";
import HalfSelectInputForm from "../molecules/HalfSelectInputForm";

export default function SignUp({handleSubmit, handleType, handleChange}) {
    return (
        <div>
            <div className={'rectangle-auth-creation'}>
                <p className={'word-auth'}>OU</p>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <HalfInputForm id={'lastname'} label={'Nom de famille'}/>,
                    <HalfInputForm id={'firstname'} label={'Prénom'}/>,
                    <InputForm id={'email'} label={'Adresse mail'}/>,
                    <HalfSelectInputForm id={'section'} label={'Section'} handleChange={handleChange}
                                         inputs={['Economique', 'Technique']}/>,
                    <HalfSelectInputForm id={'cursus'} label={'cursus'} handleChange={handleChange}
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
                    <DisplayProvider imageUrl={"https://img.icons8.com/color/48/000000/microsoft.png"}
                                     alt={'microsoft'}/>,
                ]}/>
            </div>
        </div>
    )
}