import React from 'react'
import { useEffect } from 'react'
import "../../style/files.scss"
import { ObservedNavBar } from "../templates/NavBar";
import { fileTransferStore } from '../../stores/FileTransferStore';
import { Button, CircularProgress } from '@mui/material';
import { observer } from "mobx-react";
import { sessionStore } from '../../stores/SessionStore';
import { ObservedSnackBar } from "../molecules/SnackBar";
import LoadingMessage from "../molecules/LoadingMessage";
import {Add} from "@mui/icons-material";

function Files() {

    useEffect(async () => {
        await fileTransferStore.init({ token: sessionStore.user?.token });
    }, []);

    return (
        <div>
            <ObservedNavBar />
            <div className='files'>
                <h1 className={'file-title'}>
                    Listes des synthèses et des prises de note disponibles
                </h1>
                <div className={'file-container'}>
                    {
                        fileTransferStore.files.map((file) => (
                            <div className={'file-item'}>
                                <div className={'file-name'}>
                                    <p className={'file-key'}>Nom :</p>
                                    <p className={'file-value'}>{file.name}</p>
                                </div>
                                <div className={'file-name'}>
                                    <p className={'file-key'}>Auteur :</p>
                                    <p className={'file-value'}>{file.owner}</p>
                                </div>
                                <div className={'file-name'}>
                                    <p className={'file-key'}>Date :</p>
                                    <p className={'file-value'}>{file.creationDate}</p>
                                </div>
                                <div className={'file-button'}>
                                    <input type={'submit'} className={'btn-file-download'} value={'TELECHARGER'} onClick={() => fileTransferStore.onDownloadFile(file, sessionStore.user?.token)}/>
                                    {sessionStore.user?.username === file.owner ? <input type={'submit'} className={'btn-file-delete'} value={'SUPPRIMER'} onClick={() => fileTransferStore.onDeleteFile(file, sessionStore.user?.token)}/> : null}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <label className='files__add' htmlFor='files__add'>
                    <Add/>
                    AJOUTER UN FICHIER
                </label>
                <input onChange={(event) => fileTransferStore.onInputFileChange(event.target)} id='files__add' type='file' accept='.txt' hidden></input>
                <ObservedSnackBar
                    open={fileTransferStore.isError}
                    message={fileTransferStore.errors}
                    severity={"error"} />
                {
                    fileTransferStore.isLoading && (
                        <>
                            <LoadingMessage message={"Traitement en cours..."} />
                        </>
                    )}
            </div>
        </div >
    )

        /*return (
        <div>
            <ObservedNavBar />
            <div className='files'>
                <div className='files__head'>
                    <div className='files__head__name'>Nom</div>
                    <div className='files__head__owner'>Propriétaire</div>
                    <div></div>
                    <div></div>
                </div>
                <div className='files__table'>
                    <div className='files__table__file'>
                        {
                            fileTransferStore.files.map((file) => (
                                <div className={'file-container'}>
                                    <div className='files__table__file__name'>{file.name}</div>
                                    <div className='files__table__file__owner'>{file.owner}</div>
                                    <div className='files__table__file__download'>
                                        <input type={'submit'} className={'btn-file-download'} value={'TELECHARGER'} onClick={() => fileTransferStore.onDownloadFile(file, sessionStore.user?.token)}/>
                                    </div>
                                    {sessionStore.user?.username === file.owner ? <input type={'submit'} className={'btn-file-delete'} value={'SUPPRIMER'} onClick={() => fileTransferStore.onDeleteFile(file, sessionStore.user?.token)}/> : <div></div>}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <label className='files__add' htmlFor='files__add'>AJOUTER UN FICHIER</label>
                <input onChange={(event) => fileTransferStore.onInputFileChange(event.target)} id='files__add' type='file' accept='.txt' hidden></input>
                <ObservedSnackBar
                    open={fileTransferStore.isError}
                    message={fileTransferStore.errors}
                    severity={"error"} />
                {
                    fileTransferStore.isLoading && (
                        <>
                            <LoadingMessage message={"Traitement en cours..."} />
                        </>
                    )}
            </div>
        </div >
    )*/
}

export const ObserverFiles = observer(Files);