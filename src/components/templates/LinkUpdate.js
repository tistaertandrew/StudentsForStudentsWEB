import LeftImage from "../../assets/images/peace.png";
import DisplayForm from "../organisms/DisplayForm";
import InputForm from "../molecules/InputForm";
import {observer} from "mobx-react";

function LinkUpdate({handleSubmit}) {
    return (
        <div className={'auth-grid'}>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={LeftImage} alt={'students'} className={'hero-banner-img'}/>
            </div>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <h1 className={'title-auth'}>AFFICHAGE DE VOTRE CALENDRIER</h1>
                </div>
                <p>Pour afficher votre calendrier horiairix, veuillez entrer son lien ci-dessous</p>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <InputForm id={'text'} label={'Lien horairix'}/>,
                    <input type={'submit'} className={'btn-auth'} value={'VALIDER'}/>
                ]}/>
            </div>
        </div>
    )
}

export const ObservedLinkUpdate = observer(LinkUpdate)