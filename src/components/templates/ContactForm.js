import {observer} from "mobx-react";
import DisplayForm from "../organisms/DisplayForm";
import HalfInputForm from "../molecules/HalfInputForm";
import InputForm from "../molecules/InputForm";
import RightImage from "../../assets/images/tired.png";
import TextAreaInputForm from "../molecules/TextAreaInputForm";
import {sessionStore} from "../../stores/SessionStore";
import HiddenInputForm from "../molecules/HiddenInputForm";

function ContactForm({handleSubmit}) {
    const isConnected = () => {
        return sessionStore.user ?
            [
                <HalfInputForm id={'lastname'} label={'Nom de famille'}
                               value={sessionStore.user?.lastname} disabled={true}/>,
                <HiddenInputForm id={'lastname'} value={sessionStore.user?.lastname}/>,
                <HalfInputForm id={'firstname'} label={'Prénom'}
                               value={sessionStore.user?.firstname} disabled={true}/>,
                <HiddenInputForm id={'firstname'} value={sessionStore.user?.firstname}/>,
                <InputForm id={'email'} label={'Adresse mail'}
                           value={sessionStore.user?.email} disabled={true}/>,
                <HiddenInputForm id={'email'} value={sessionStore.user?.email}/>,
                <TextAreaInputForm id={'message'} label={'Votre message...'}/>,
                <input type={'submit'} className={'btn-auth'} value={'ENVOYER'}/>
            ]
            :
            [
                <HalfInputForm id={'lastname'} label={'Nom de famille'}
                               value={sessionStore.user?.lastname}/>,
                <HalfInputForm id={'firstname'} label={'Prénom'}
                               value={sessionStore.user?.firstname}/>,
                <InputForm id={'email'} label={'Adresse mail'}
                           value={sessionStore.user?.email}/>,
                <TextAreaInputForm id={'message'} label={'Votre message...'}/>,
                <input type={'submit'} className={'btn-auth'} value={'ENVOYER'}/>
            ]
    }

    return (
        <div className={'auth-grid'}>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <h1 className={'title-auth'}>CONTACTER UN ADMINISTRATEUR</h1>
                </div>
                <DisplayForm handleSubmit={handleSubmit}
                             inputs={[isConnected()]}/>
            </div>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={RightImage} alt={'students'} className={'hero-banner-img'}/>
            </div>
        </div>

    )
}

export const ObservedContactForm = observer(ContactForm)