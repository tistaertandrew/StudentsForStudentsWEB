import {TextField} from "@mui/material";

export default function InputForm({id, label}) {
    return (
        <TextField
            sx={{margin: '1%'}}
            required
            variant={"standard"}
            type={id}
            id={id}
            label={label}
            name={id}
            autoComplete={id}
            className={'input-auth'}
            autoFocus
        />
    )
}