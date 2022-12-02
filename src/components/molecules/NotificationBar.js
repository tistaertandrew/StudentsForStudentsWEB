import {Alert, Snackbar} from "@mui/material";
import {observer} from "mobx-react";

function NotificationBar({open, message, severity, handleClose}) {
    return (
        <Snackbar open={open}
                  onClose={handleClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        >
            <Alert severity={severity}
                   sx={{width: '100%'}}
                   className='justify-center'
                   onClose={handleClose}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export const ObservedNotificationBar = observer(NotificationBar)