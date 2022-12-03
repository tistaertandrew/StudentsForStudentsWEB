import {observer} from "mobx-react";
import {adminStore} from "../../stores/AdminStore";
import DisplayUsers from "../organisms/DisplayUsers";
import {Tooltip} from "@mui/material";
import {Add, Cached, Tune} from "@mui/icons-material";

function DashboardContent({handleAdd, handleEdit, handleBlock, handleDelete}) {

    return (
        <div className={'files'}>
            <h1 className={'file-title'}>
                <Tooltip title={'Filtrer les utilisateurs'}>
                    <Tune className={'settings-icon-right'} onClick={() => {}}/>
                </Tooltip>
                Liste des utilisateurs de Students for Students
                <Tooltip title={'Réinitialiser les filtres appliqués'}>
                    <Cached className={'settings-icon-left'} onClick={() => {}}/>
                </Tooltip>
            </h1>
            <DisplayUsers handleEdit={handleEdit} handleBlock={handleBlock} handleDelete={handleDelete} users={adminStore.users}/>
            <input type={'submit'} className={'files__add'} value={'AJOUTER UN UTILISATEUR'} onClick={() => {}}/>
        </div>
    )
}

export const ObservedDashboardContent = observer(DashboardContent)