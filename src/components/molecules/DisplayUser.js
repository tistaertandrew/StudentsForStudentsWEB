import {Accordion, AccordionSummary, Tooltip} from "@mui/material";
import {
    Block, CheckOutlined,
    Delete, DeleteOutline,
    Download,
    Edit,
    EditOutlined,
    Lock,
    LockOpen,
    LockOpenOutlined,
    LockOutlined
} from "@mui/icons-material";
import React from "react";

export function DisplayUser({firstname, lastname, email, isAdmin, isBanned, handleBlock, handleDelete, handleEdit}) {
    const [expanded, setExpanded] = React.useState(false);
    const [mode, setMode] = React.useState(false);

    const onEdit = () => {
        let newLastname = document.getElementById('lastname').value
        let newFirstname = document.getElementById('firstname').value

        handleEdit(lastname, firstname, newLastname, newFirstname, email)
        setMode(!mode)
    }

    return (
        <Accordion onClick={() => setExpanded(false)} expanded={expanded} sx={{
            borderRadius: '10px',
            boxShadow: '10px 10px 39px -13px rgba(0, 0, 0, 0.75)',
            marginBottom: '1%',
        }}>
            <AccordionSummary expandIcon={undefined}>
                <div className={'request-item'}>
                    <div className={'request-name'} style={{minWidth: '15%', maxWidth: '15%'}}>
                        <p className={'request-key'}>Nom :</p>
                        {!mode ?
                            <p className={'request-value'}>{lastname}</p>
                            :
                            <input type={'text'} className={'edit-value'} defaultValue={lastname} id={'lastname'}/>
                        }
                    </div>
                    <div className={'request-name'} style={{minWidth: '15%', maxWidth: '15%'}}>
                        <p className={'request-key'}>Prénom :</p>
                        {!mode ?
                            <p className={'request-value'}>{firstname}</p>
                            :
                            <input type={'text'} className={'edit-value'} defaultValue={firstname} id={'firstname'}/>
                        }
                    </div>
                    <div className={'request-name'} style={{minWidth: '20%', maxWidth: '20%'}}>
                        <p className={'request-key'}>Email :</p>
                        <p className={'request-value'}>{email}</p>
                    </div>
                    <div className={'request-name'} style={{minWidth: '15%', maxWidth: '15%'}}>
                        <p className={'request-key'}>Role :</p>
                        <p className={'request-value'}>{isAdmin ? 'Administrateur' : 'Membre'}</p>
                    </div>
                    <div className={'request-button'}>
                        {!mode ?
                            <Tooltip title={'Modifier l\'utilisateur'}>
                                <EditOutlined className={'icon-accordion'}
                                              onClick={() => {setMode(true)}}
                                              sx={{color: '#5D7052', width: '40px', height: '40px'}}/>
                            </Tooltip>
                            :
                            <Tooltip title={'Valider les modifications'}>
                                <CheckOutlined className={'icon-accordion'}
                                               onClick={() => {onEdit()}}
                                               sx={{color: '#5D7052', width: '40px', height: '40px'}}/>
                            </Tooltip>
                        }
                        {!isBanned && <Tooltip title={'Bloquer l\'utilisateur'}>
                            <LockOutlined className={'icon-accordion'} onClick={() => handleBlock(email)}
                                          sx={{color: '#C18845', width: '40px', height: '40px'}}/>
                        </Tooltip>}
                        {isBanned && <Tooltip title={'Débloquer l\'utilisateur'}>
                            <LockOpenOutlined className={'icon-accordion'} onClick={() => handleBlock(email)}
                                              sx={{color: '#C18845', width: '40px', height: '40px'}}/>
                        </Tooltip>}
                        <Tooltip title={'Supprimer l\'utilisateur'}>
                            <DeleteOutline className={'icon-accordion'} onClick={() => handleDelete(email)}
                                           sx={{color: '#670000', width: '40px', height: '40px'}}/>
                        </Tooltip>
                    </div>
                </div>
            </AccordionSummary>
        </Accordion>
    )
}