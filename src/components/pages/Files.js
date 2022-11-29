import React, {useEffect} from 'react'
import "../../style/files.scss"
import {ObservedNavBar} from "../templates/NavBar";
import {fileTransferStore} from '../../stores/FileTransferStore';
import {observer} from "mobx-react";
import {sessionStore} from '../../stores/SessionStore';
import {ObservedSnackBar} from "../molecules/SnackBar";
import LoadingMessage from "../molecules/LoadingMessage";
import DisplayForm from "../organisms/DisplayForm";
import SelectInputForm from "../molecules/SelectInputForm";
import RedirectLink from "../molecules/RedirectLink";
import {Dialog} from "@mui/material";
import {DropzoneArea} from "material-ui-dropzone";
import DisplaySynthese from "../molecules/DisplaySynthese";
import EmptyContent from "../molecules/EmptyContent";

function Files() {
    useEffect(() => {
        fileTransferStore.loadCourses(sessionStore.user.cursusId)
    }, [sessionStore.user])

    const handleSubmit = (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget)
        fileTransferStore.handleFileSubmit([...data.values()])
    }

    const displayFiles = () => {
        if (fileTransferStore.files.length === 0) {
            return (
                <EmptyContent message={'Aucune synthèse à afficher'}/>
            )
        }
        return fileTransferStore.files.map((file, index) => {
            return <DisplaySynthese id={index} name={file.name} sender={file.owner}
                                    date={file.creationDate}
                                    course={file.course.content}
                                    handleDownload={() => fileTransferStore.onDownloadFile(file, sessionStore.user.token)}
                                    handleDelete={() => fileTransferStore.onDeleteFile(file, sessionStore.user.token)}
            />
        })
    }

    useEffect(async () => {
        await fileTransferStore.init({token: sessionStore.user?.token});
    }, []);

    return (
        <div>
            <ObservedNavBar/>
            <div className='files'>
                <h1 className={'file-title'}>
                    Listes des synthèses et des prises de note disponibles
                </h1>
                <div className={'file-container'}>
                    {displayFiles()}
                </div>
                <input type={'submit'} className={'files__add'} value={'AJOUTER UNE SYNTHESE'}
                       onClick={() => fileTransferStore.openPopup()}/>
                <Dialog open={fileTransferStore.open} onClose={() => fileTransferStore.closePopup()}>
                    <div className={'popup-container'}>
                        <h1 className={'popup-title'}>AJOUTER UNE SYNTHESE</h1>
                        <DisplayForm handleSubmit={handleSubmit} inputs={[
                            <SelectInputForm id={'course'} label={'Cours concerné*'}
                                             inputs={fileTransferStore.courses}/>,
                            <div style={{width: '82%'}}>
                                <DropzoneArea dropzoneText={'Ajouter un fichier .txt'} acceptedFiles={['.txt']}
                                              filesLimit={1} showAlerts={false} showPreviews={true}
                                              showPreviewsInDropzone={false} useChipsForPreview
                                              previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                                              previewText="Synthèse selectionnée"
                                              onChange={(files) => fileTransferStore.file = files[0]}/>
                            </div>,
                            <input type={'submit'} className={'btn-auth'} value={'AJOUTER'}/>,
                        ]}/>
                        <RedirectLink label={'Annuler'} handleMode={() => fileTransferStore.closePopup()}/>
                    </div>
                </Dialog>
                <ObservedSnackBar
                    open={fileTransferStore.isError}
                    message={fileTransferStore.errors}
                    severity={"error"}/>
                {
                    fileTransferStore.isLoading && (
                        <>
                            <ObservedSnackBar open={fileTransferStore.isLoading}
                                              message={'Traitement en cours...'}
                                              severity={'info'}/>
                        </>
                    )}
            </div>
        </div>
    )
}

export const ObserverFiles = observer(Files);