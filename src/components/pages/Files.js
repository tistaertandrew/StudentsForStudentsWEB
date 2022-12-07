import React, {useEffect} from 'react'
import "../../style/files.scss"
import {ObservedNavBar} from "../templates/NavBar";
import {fileTransferStore} from '../../stores/FileTransferStore';
import {observer} from "mobx-react";
import {sessionStore} from '../../stores/SessionStore';
import {ObservedSnackBar} from "../molecules/SnackBar";
import DisplayForm from "../organisms/DisplayForm";
import SelectInputForm from "../molecules/SelectInputForm";
import RedirectLink from "../molecules/RedirectLink";
import {Dialog, TextField, Tooltip} from "@mui/material";
import {DropzoneArea} from "material-ui-dropzone";
import DisplaySynthese from "../molecules/DisplaySynthese";
import EmptyContent from "../molecules/EmptyContent";
import {Cached, Tune} from "@mui/icons-material";
import InputForm from "../molecules/InputForm";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import {fr} from 'date-fns/locale'
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";


function Files() {
    const [mode, setMode] = React.useState('courses')
    const [date, setDate] = React.useState(new Date())

    const handleChangeDate = (newDate) => {
        setDate(newDate)
    };

    useEffect(() => {
        fileTransferStore.loadCourses(sessionStore.user.cursusId)
    }, [sessionStore.user])

    const handleSubmit = (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget)
        fileTransferStore.handleFileSubmit([...data.values()])
    }

    const handleMode = (id) => {
        setMode(id)
    }

    const handleFilterCourse = async (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget)
        await fileTransferStore.filterRequestsByCourse([...data.values()])
    }

    const handleFilterAuthor = async (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget)
        await fileTransferStore.filterRequestsByAuthor([...data.values()])
    }
    const handleFilterDate = async () => {
        await fileTransferStore.filterRequestsByDate(date)
    }

    const handleResetFilter = async () => {
        await fileTransferStore.handleResetFilter()
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
                    <Tooltip title={'Filtrer les synthèses'}>
                        <Tune className={'settings-icon-right'} onClick={() => fileTransferStore.openFilterPopup()}/>
                    </Tooltip>
                    Liste des synthèses disponibles
                    <Tooltip title={'Réinitialiser les filtres appliqués'}>
                        <Cached className={'settings-icon-left'} onClick={handleResetFilter}/>
                    </Tooltip>
                </h1>
                <div className={'file-container'}>
                    {displayFiles()}
                </div>
                <input type={'submit'} className={'files__add'} value={'AJOUTER UNE SYNTHESE'}
                       onClick={() => fileTransferStore.openFileAddPopup()}/>
                <Dialog open={fileTransferStore.openFilter} onClose={() => fileTransferStore.closeFilterPopup()}>
                    <div className={'popup-container'}>
                        <h1 className={'popup-title'}>FILTRER LES SYNTHESES</h1>
                        <div className={'filter-types'} id={'filters'}>
                            <li id={'courses'} className={mode === 'courses' && 'active'}
                                onClick={(e) => handleMode(e.target.id)}>Cours
                            </li>
                            <li id={'author'} className={mode === 'author' && 'active'}
                                onClick={(e) => handleMode(e.target.id)}>Auteur
                            </li>
                            <li id={'date'} className={mode === 'date' && 'active'}
                                onClick={(e) => handleMode(e.target.id)}>Date
                            </li>
                        </div>
                        {mode === 'courses' &&
                            <DisplayForm handleSubmit={handleFilterCourse} inputs={[
                                <SelectInputForm id={'course'} label={'Cours concerné *'}
                                                 inputs={fileTransferStore.courses}/>,
                                <input type={'submit'} className={'btn-auth'} value={'FILTRER'}/>
                            ]}/>}
                        {mode === 'author' &&
                            <DisplayForm handleSubmit={handleFilterAuthor} inputs={[
                                <InputForm id={'author'} label={'Auteur concerné'}/>,
                                <input type={'submit'} className={'btn-auth'} value={'FILTRER'}/>
                            ]}/>}
                        {mode === 'date' &&
                            <DisplayForm handleSubmit={handleFilterDate} inputs={[
                                <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            className={'date-picker'}
                                            label="Date concernée *"
                                            inputFormat="dd/MM/yyyy"
                                            value={date}
                                            onChange={handleChangeDate}
                                            renderInput={(params) => <TextField id={'date'} {...params}/>}
                                        />
                                </LocalizationProvider>,
                                <input type={'submit'} className={'btn-auth'} value={'FILTRER'}/>
                            ]}/>}
                        <RedirectLink label={'Retour'} handleMode={() => fileTransferStore.closeFilterPopup()}/>
                    </div>
                </Dialog>
                <Dialog open={fileTransferStore.openFileAdd} onClose={() => fileTransferStore.closeFileAddPopup()}>
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
                        <RedirectLink label={'Annuler'} handleMode={() => fileTransferStore.closeFileAddPopup()}/>
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