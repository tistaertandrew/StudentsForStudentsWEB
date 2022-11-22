import React from 'react'
import { useEffect } from 'react'
import "../../style/files.scss"
import { ObservedNavBar } from "../templates/NavBar";
import { fileTransferStore } from '../../stores/FileTransferStore';
import { Button, CircularProgress } from '@mui/material';
import { observer } from "mobx-react";
import { sessionStore } from '../../stores/SessionStore';
import { ObservedSnackBar } from "../molecules/SnackBar";

function Files() {

    useEffect(async () => {
        await fileTransferStore.init({ token: sessionStore.user?.token });
    }, []);

    if (fileTransferStore.files.length === 0) {
        <ObservedNavBar />
        return <div>Aucune synthèse</div>
    }

    return (
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
                                <>
                                    <div className='files__table__file__name'>{file.name}</div>
                                    <div className='files__table__file__owner'>{file.owner}</div>
                                    <div className='files__table__file__download'>
                                        <Button variant="contained" color="success" onClick={() => fileTransferStore.onDownloadFile(file, sessionStore.user?.token)} className='files__table__file__button'>Download</Button>
                                    </div>
                                    {sessionStore.user?.username === file.owner ? <Button variant="outlined" color='error' onClick={() => fileTransferStore.onDeleteFile(file, sessionStore.user?.token)} className='files__table__file__button'>Delete</Button> : <div></div>}
                                </>
                            ))
                        }
                    </div>
                </div>
                <label className='files__add' htmlFor='files__add'>Ajouter un fichier</label>
                <input onChange={(event) => fileTransferStore.onInputFileChange(event.target)} id='files__add' type='file' accept='.txt' hidden></input>
                <ObservedSnackBar
                    open={fileTransferStore.isError}
                    message={fileTransferStore.errors}
                    severity={"error"} />
                {
                    fileTransferStore.isLoading && (
                        <>
                            <div className='files__progress'>
                                <CircularProgress />
                            </div>
                            <div className='files__overlay'></div>
                        </>
                    )}
            </div>
        </div >
    )
}

export const ObserverFiles = observer(Files);