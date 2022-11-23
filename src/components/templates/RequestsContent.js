import {observer} from "mobx-react";
import {requestsStore} from "../../stores/RequestsStore";
import React from "react";
import DisplayRequests from "../organisms/DisplayRequests";
import {Dialog, Tooltip} from "@mui/material";
import DisplayForm from "../organisms/DisplayForm";
import RedirectLink from "../molecules/RedirectLink";
import {Cached, Tune} from "@mui/icons-material";
import SelectInputForm from "../molecules/SelectInputForm";

function RequestsContent({handleAccept, handleChangeMode, handleFiltrerRequests, handleResetFilter}) {
    const onAccept = (id) => {
        handleAccept(id)
    }

    return (
        <div className={'requests'}>
            <h1 className={'file-title'}>
                <Tooltip title={'Filtrer les demandes'}>
                    <Tune className={'settings-icon-right'} onClick={() => requestsStore.openFilterPopup()}/>
                </Tooltip>
                Liste des demandes disponibles
                <Tooltip title={'Réinitialiser les filtres appliqués'}>
                    <Cached className={'settings-icon-left'} onClick={handleResetFilter}/>
                </Tooltip>
            </h1>
            <DisplayRequests requests={requestsStore.requests} onAccept={onAccept}/>
            <input type={'submit'} className={'files__add'} value={'AJOUTER UNE DEMANDE'} onClick={handleChangeMode}/>
            <Dialog open={requestsStore.filterPopup} onClose={() => requestsStore.closeFilterPopup()}>
                <div className={'popup-container'}>
                    <h1 className={'popup-title'}>FILTRER LES DEMANDES</h1>
                    <DisplayForm handleSubmit={handleFiltrerRequests} inputs={[
                        <SelectInputForm id={'course'} label={'Cours concerné'} inputs={requestsStore.courses}/>,
                        <input type={'submit'} className={'btn-auth'} value={'FILTRER'}/>,
                    ]}/>
                    <RedirectLink label={'Retour'} handleMode={() => requestsStore.closeFilterPopup()}/>
                </div>
            </Dialog>
        </div>
    )
}

export const ObservedRequestsContent = observer(RequestsContent)