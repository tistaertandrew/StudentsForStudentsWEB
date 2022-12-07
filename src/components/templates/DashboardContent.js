import {observer} from "mobx-react";
import {adminStore} from "../../stores/AdminStore";
import DisplayUsers from "../organisms/DisplayUsers";
import {Dialog, Tooltip} from "@mui/material";
import {Add, Cached, Tune} from "@mui/icons-material";
import {requestsStore} from "../../stores/RequestsStore";
import DisplayForm from "../organisms/DisplayForm";
import SelectInputForm from "../molecules/SelectInputForm";
import RedirectLink from "../molecules/RedirectLink";
import HalfInputForm from "../molecules/HalfInputForm";
import InputForm from "../molecules/InputForm";
import HalfSelectInputForm from "../molecules/HalfSelectInputForm";

function DashboardContent({handleAdd, handleEdit, handleBlock, handleDelete, handleFilterUsers, handleResetFilter}) {

    return (
        <div className={'files'}>
            <h1 className={'file-title'}>
                <Tooltip title={'Filtrer les utilisateurs'}>
                    <Tune className={'settings-icon-right'} onClick={() => {adminStore.openFilterPopup()}}/>
                </Tooltip>
                Liste des utilisateurs de Students for Students
                <Tooltip title={'Réinitialiser les filtres appliqués'}>
                    <Cached className={'settings-icon-left'} onClick={handleResetFilter}/>
                </Tooltip>
            </h1>
            <DisplayUsers handleEdit={handleEdit} handleBlock={handleBlock} handleDelete={handleDelete} users={adminStore.users}/>
            <input type={'submit'} className={'files__add'} value={'AJOUTER UN UTILISATEUR'} onClick={() => adminStore.openUserPopup()}/>
            <Dialog open={adminStore.userPopup} onClose={() => adminStore.closeUserPopup()}>
                <div className={'popup-container'}>
                    <h1 className={'popup-title'}>AJOUTER UN UTILISATEUR</h1>
                    <DisplayForm handleSubmit={handleAdd} inputs={[
                        <HalfInputForm id={'lastname'} label={'Nom de famille'}/>,
                        <HalfInputForm id={'firstname'} label={'Prénom'}/>,
                        <InputForm id={'email'} label={'Adresse mail'}/>,
                        <HalfSelectInputForm id={'section'} label={'Section *'}
                                             handleChange={(e) => adminStore.loadCursus(e.target.value)}
                                             inputs={adminStore.sections}/>,
                        <HalfSelectInputForm id={'cursus'} label={'Cursus *'}
                                             inputs={adminStore.cursus}/>,
                        <InputForm id={'password'} label={'Mot de passe'}/>,
                        <InputForm id={'password'} label={'Confirmation du mot de passe'}/>,
                        <input type={'submit'} className={'btn-auth'} value={'AJOUTER'}/>,
                    ]}/>
                    <RedirectLink label={'Retour'} handleMode={() => adminStore.closeUserPopup()}/>
                </div>
            </Dialog>
            <Dialog open={adminStore.filterPopup} onClose={() => adminStore.closeFilterPopup()}>
                <div className={'popup-container'}>
                    <h1 className={'popup-title'}>FILTRER LES UTILISATEURS</h1>
                    <DisplayForm handleSubmit={handleFilterUsers} inputs={[
                        <InputForm id={'email'} label={'Nom/Prénom/Email'}/>,
                        <input type={'submit'} className={'btn-auth'} value={'FILTRER'}/>,
                    ]}/>
                    <RedirectLink label={'Retour'} handleMode={() => adminStore.closeFilterPopup()}/>
                </div>
            </Dialog>
        </div>
    )
}

export const ObservedDashboardContent = observer(DashboardContent)