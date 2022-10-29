import {TextField} from "@mui/material";

export default function HiddenInputForm({id, value}) {
    return(
        <TextField
            sx={{margin: '5px', display: 'none'}}
            required
            variant={"filled"}
            type={'text'}
            id={id}
            name={id}
            value={value}
            autoComplete={id}
            label={'Hidden input'}
            autoFocus
        />
    )
}