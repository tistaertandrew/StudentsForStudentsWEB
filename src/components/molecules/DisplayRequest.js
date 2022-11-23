import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import React from "react";

export default function DisplayRequest({id, name, sender, date, course, place, status, description, handleAccept}) {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Accordion id={id} sx={{
            borderRadius: '10px',
            boxShadow: '10px 10px 39px -13px rgba(0, 0, 0, 0.75)',
            marginBottom: '1%'
        }} expanded={expanded} onClick={() => setExpanded(!expanded)}>
            <AccordionSummary expandIcon={<ExpandMore/>}>
                <div className={'request-item'}>
                    <div className={'request-name'} style={{minWidth: '30%'}}>
                        <p className={'request-key'}>Nom :</p>
                        <p className={'request-value'}>{name}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '20%'}}>
                        <p className={'request-key'}>Auteur :</p>
                        <p className={'request-value'}>{sender}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '15%'}}>
                        <p className={'request-key'}>Date :</p>
                        <p className={'request-value'}>{date}</p>
                    </div>
                    <div className={'request-button'}>
                        <input type={'submit'}
                               className={expanded ? 'btn-request-accept' : 'btn-request-accept-disabled'}
                               value={'ACCEPTER'} onClick={handleAccept} disabled={!expanded}/>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails sx={{padding: '0 40px 0 16px'}}>
                <div className={'request-details-item'}>
                    <div className={'request-name'} style={{minWidth: '30%'}}>
                        <p className={'request-key'}>Cours :</p>
                        <p className={'request-value'}>{course}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '20%'}}>
                        <p className={'request-key'}>Lieu :</p>
                        <p className={'request-value'}>{place}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '15%'}}>
                        <p className={'request-key'}>Status :</p>
                        <p className={'request-value'}
                           style={status ? {color: 'green'} : {color: 'orange'}}>{status ? 'accepté' : 'en attente'}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '100%'}}>
                        <p className={'request-key'}>Description :</p>
                        <p className={'request-value'}>{description}</p>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}