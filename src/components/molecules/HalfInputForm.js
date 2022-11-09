import {TextField} from "@mui/material";

export default function HalfInputForm({id, label, value, disabled}) {
    return (
        <TextField
            sx={{margin: '1%'}}
            required
            disabled={disabled}
            variant={"standard"}
            margin={'normal'}
            type={id}
            value={value}
            id={id}
            label={label}
            name={id}
            autoComplete={id}
            className={'half-input-auth'}
            autoFocus
        />
    )
}