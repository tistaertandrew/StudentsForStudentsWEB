import {observer} from "mobx-react";
import LeftImage from "../../assets/images/request.png";
import DisplayForm from "../organisms/DisplayForm";
import InputForm from "../molecules/InputForm";
import RedirectLink from "../molecules/RedirectLink";
import {requestsStore} from "../../stores/RequestsStore";
import {People} from "@mui/icons-material";
import TextAreaInputForm from "../molecules/TextAreaInputForm";
import HalfInputForm from "../molecules/HalfInputForm";
import HalfSelectInputForm from "../molecules/HalfSelectInputForm";
import {Dialog} from "@mui/material";

function RequestForm({handleSubmitRequest, handleSubmitAddress}) {
    return (
        <div className={'auth-grid'}>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <People className={'icon-auth'}/>
                    <h1 className={'title-auth'}>DEMANDE DE TUTORAT</h1>
                </div>
                <DisplayForm handleSubmit={handleSubmitRequest} inputs={[
                    <InputForm id={'name'} label={'Nom de la demande'}/>,
                    <HalfSelectInputForm id={'place'} label={'Lieu concernĂ© *'} inputs={requestsStore.places}/>,
                    <HalfSelectInputForm id={'course'} label={'Cours concernĂ© *'} inputs={requestsStore.courses}/>,
                    <RedirectLink label={'Ajouter une adresse'} handleMode={() => requestsStore.openAddressPopup()}/>,
                    <TextAreaInputForm id={'description'} label={'Description de la demande *'}/>,
                    <input type={'submit'} className={'btn-auth'} value={'VALIDER'}/>
                ]}/>
                <RedirectLink label={'Retour'} handleMode={() => requestsStore.changeMode()}/>
            </div>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={LeftImage} alt={'students'} className={'hero-banner-img'}/>
            </div>
            <Dialog open={requestsStore.addressPopup} onClose={() => requestsStore.closeAddressPopup()}>
                <div className={'popup-container'}>
                    <h1 className={'popup-title'}>AJOUTER UNE ADRESSE</h1>
                    <DisplayForm handleSubmit={handleSubmitAddress} inputs={[
                        <InputForm id={'name'} label={'Rue'}/>,
                        <HalfInputForm id={'text'} label={'NumĂ©ro'}/>,
                        <HalfInputForm id={'number'} label={'Code postal'}/>,
                        <InputForm id={'locality'} label={'LocalitĂ©'}/>,
                        <input type={'submit'} className={'btn-auth'} value={'AJOUTER'}/>
                    ]}/>
                    <RedirectLink label={'Annuler'} handleMode={() => requestsStore.closeAddressPopup()}/>
                </div>
            </Dialog>
        </div>
    )

}

export const ObservedRequestForm = observer(RequestForm)