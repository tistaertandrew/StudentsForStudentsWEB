import {TextField} from "@mui/material";

export default function InputForm({id, label, disabled, value}) {
    return (
        <TextField
            sx={{margin: '1%'}}
            required
            variant={"standard"}
            type={id}
            value={value}
            id={id}
            disabled={disabled}
            label={label}
            name={id}
            autoComplete={id}
            className={'input-auth'}
            autoFocus
        />
    )
}