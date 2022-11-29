import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import React from "react";
import {sessionStore} from "../../stores/SessionStore";

export default function DisplaySynthese({id, name, sender, date, course, handleDownload, handleDelete}) {
    return (
        <Accordion id={id} sx={{
            borderRadius: '10px',
            boxShadow: '10px 10px 39px -13px rgba(0, 0, 0, 0.75)',
            marginBottom: '1%'
        }}>
            <AccordionSummary expandIcon={<ExpandMore/>}>
                <div className={'request-item'}>
                    <div className={'request-name'} style={{minWidth: '30%', maxWidth: '30%'}}>
                        <p className={'request-key'}>Nom :</p>
                        <p className={'request-value'}>{name}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '20%', maxWidth: '20%'}}>
                        <p className={'request-key'}>Auteur :</p>
                        <p className={'request-value'}>{sender}</p>
                    </div>
                    <div className={'request-button'}>
                            <input type={'submit'}
                                   className={'btn-request-accept'}
                                   value={'TELECHARGER'} onClick={handleDownload}/>
                        {
                            sessionStore.user?.username === sender ?
                            <input type={'submit'} className={'btn-file-delete'} value={'SUPPRIMER'}
                                   onClick={handleDelete}/> : null
                        }
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails sx={{padding: '0 40px 0 16px'}}>
                <div className={'request-details-item'}>
                    <div className={'request-name'} style={{minWidth: '30%', maxWidth: '30%'}}>
                        <p className={'request-key'}>Cours :</p>
                        <p className={'request-value'}>{course}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '20%', maxWidth: '20%'}}>
                        <p className={'request-key'}>Date :</p>
                        <p className={'request-value'}>{date}</p>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}