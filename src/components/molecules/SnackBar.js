import {Alert, Snackbar} from "@mui/material";
import {observer} from "mobx-react";

function SnackBar({open, message, severity}) {
    return (
        <Snackbar open={open}
                  autoHideDuration={5000}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert severity={severity}
                   sx={{width: '100%'}}
                   className='justify-center'
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export const ObservedSnackBar = observer(SnackBar)