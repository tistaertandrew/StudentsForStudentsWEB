import {observer} from "mobx-react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayForm from "../organisms/DisplayForm";
import HalfInputForm from "../molecules/HalfInputForm";
import InputForm from "../molecules/InputForm";
import HalfSelectInputForm from "../molecules/HalfSelectInputForm";
import {authStore} from "../../stores/AuthStore";
import RedirectLink from "../molecules/RedirectLink";
import DisplayProviders from "../organisms/DisplayProviders";
import DisplayGoogleProvider from "../molecules/DisplayGoogleProvider";
import config from "../../config.json";
import RightImage from "../../assets/images/tired.png";
import TextAreaInputForm from "../molecules/TextAreaInputForm";
import {sessionStore} from "../../stores/SessionStore";

function ContactForm({handleSubmit}) {
    return (
        <div className={'auth-grid'}>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <h1 className={'title-auth'}>CONTACTER UN ADMINISTRATEUR</h1>
                </div>
                <DisplayForm handleSubmit={handleSubmit}
                             inputs={[
                                 <HalfInputForm id={'lastname'} label={'Nom de famille'} value={sessionStore.user?.lastname}/>,
                                 <HalfInputForm id={'firstname'} label={'Prénom'} value={sessionStore.user?.firstname}/>,
                                 <InputForm id={'email'} label={'Adresse mail'} value={sessionStore.user?.email}/>,
                                 <TextAreaInputForm id={'message'} label={'Votre message...'}/>,
                                 <input type={'submit'} className={'btn-auth'} value={'ENVOYER'}/>
                             ]}/>
            </div>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={RightImage} alt={'students'} className={'hero-banner-img'}/>
            </div>
        </div>

    )
}

export const ObservedContactForm = observer(ContactForm)