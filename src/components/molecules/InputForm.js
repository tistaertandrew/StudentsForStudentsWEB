import {TextField} from "@mui/material";

export default function InputForm({id, label}) {
    return (
        <TextField
            sx={{margin: '5px'}}
            required
            variant={"filled"}
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