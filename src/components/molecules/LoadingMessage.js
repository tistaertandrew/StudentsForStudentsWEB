import {CircularProgress} from "@mui/material";

export default function LoadingMessage({message}) {
    return (
        <div className={'loading-message'}>
            <CircularProgress sx={{color: '#5D7052'}}/>
            <h1>{message}</h1>
        </div>
    )


}