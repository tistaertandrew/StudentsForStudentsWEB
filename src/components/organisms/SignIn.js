import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputForm from "../molecules/InputForm";
import RedirectLink from "../molecules/RedirectLink";
import DisplayForm from "./DisplayForm";
import DisplayProviders from "./DisplayProviders";
import DisplayProvider from "../molecules/DisplayProvider";

export default function SignIn({handleSubmit, handleType}) {

    return (
        <div>
            <div className={'rectangle-auth'}>
                <p className={'word-auth'}>OU</p>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <InputForm id={'email'} label={'Adresse mail'}/>,
                    <InputForm id={'password'} label={'Mot de passe'}/>,
                    <input type={'submit'} className={'btn-auth'} value={'SE CONNECTER'}/>
                ]}/>
                <RedirectLink label={'CREER UN COMPTE'} handleType={handleType}/>
            </div>
            <div className={'rectangle-providers'}>
                <LockOutlinedIcon className={'icon-auth'}/>
                <h1 className={'title-auth'}>CONNEXION</h1>
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