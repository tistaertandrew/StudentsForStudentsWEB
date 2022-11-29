import {Accordion, AccordionDetails, AccordionSummary, Tooltip} from "@mui/material";
import {Delete, Download, ExpandMore} from "@mui/icons-material";
import React from "react";
import {sessionStore} from "../../stores/SessionStore";

export default function DisplaySynthese({id, name, sender, date, course, handleDownload, handleDelete}) {
    const [expanded, setExpanded] = React.useState(false);
    return (
        <Accordion id={id} onClick={() => setExpanded(false)} expanded={expanded} sx={{
            borderRadius: '10px',
            boxShadow: '10px 10px 39px -13px rgba(0, 0, 0, 0.75)',
            marginBottom: '1%',
        }}>
            <AccordionSummary expandIcon={undefined}>
                <div className={'request-item'}>
                    <div className={'request-name'} style={{minWidth: '20%', maxWidth: '20%'}}>
                        <p className={'request-key'}>Nom :</p>
                        <p className={'request-value'}>{name}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '15%', maxWidth: '15%'}}>
                        <p className={'request-key'}>Auteur :</p>
                        <p className={'request-value'}>{sender}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '30%', maxWidth: '30%'}}>
                        <p className={'request-key'}>Cours :</p>
                        <p className={'request-value'}>{course}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '10%', maxWidth: '10%'}}>
                        <p className={'request-key'}>Date :</p>
                        <p className={'request-value'}>{date}</p>
                    </div>
                    <div className={'request-button'}>
                        <Tooltip title={'Télécharger la synthèse'}>
                            <Download className={'icon-accordion'} onClick={handleDownload} sx={{color: '#5D7052', width: '40px', height: '40px'}}/>
                        </Tooltip>
                        {
                            sessionStore.user?.username === sender ?
                                <Tooltip title={'Supprimer la synthèse'}>
                                    <Delete className={'icon-accordion'} onClick={handleDelete} sx={{color: '#670000', width: '40px', height: '40px'}}/>
                                </Tooltip> : null
                        }
                    </div>
                </div>
            </AccordionSummary>
        </Accordion>
    )
}