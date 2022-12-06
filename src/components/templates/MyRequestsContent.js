import {observer} from "mobx-react";
import React from "react";
import {Dialog, Tooltip} from "@mui/material";
import DisplayForm from "../organisms/DisplayForm";
import RedirectLink from "../molecules/RedirectLink";
import {Cached, Tune} from "@mui/icons-material";
import SelectInputForm from "../molecules/SelectInputForm";
import {myRequestsStore} from "../../stores/MyRequestsStore";
import DisplayMyRequests from "../organisms/DisplayMyRequests";

function MyRequestsContent({handleDelete, handleFiltrerRequests, handleResetFilter}) {
    const onDelete = (id) => {
        handleDelete(id)
    }

    return (
        <div className={'requests'}>
            <h1 className={'file-title'}>
                <Tooltip title={'Filtrer mes demandes'}>
                    <Tune className={'settings-icon-right'} onClick={() => myRequestsStore.openFilterPopup()}/>
                </Tooltip>
                Liste des mes demandes de tutorat créées et acceptées
                <Tooltip title={'Réinitialiser les filtres appliqués'}>
                    <Cached className={'settings-icon-left'} onClick={handleResetFilter}/>
                </Tooltip>
            </h1>
            <DisplayMyRequests onDelete={onDelete} requests={myRequestsStore.myRequests}/>
            <Dialog open={myRequestsStore.filterPopup} onClose={() => myRequestsStore.closeFilterPopup()}>
                <div className={'popup-container'}>
                    <h1 className={'popup-title'}>FILTRER MES DEMANDES</h1>
                    <DisplayForm handleSubmit={handleFiltrerRequests} inputs={[
                        <SelectInputForm id={'course'} label={'Cours concerné'} inputs={myRequestsStore.courses}/>,
                        <input type={'submit'} className={'btn-auth'} value={'FILTRER'}/>,
                    ]}/>
                    <RedirectLink label={'Retour'} handleMode={() => myRequestsStore.closeFilterPopup()}/>
                </div>
            </Dialog>
        </div>
    )
}

export const ObservedMyRequestsContent = observer(MyRequestsContent)