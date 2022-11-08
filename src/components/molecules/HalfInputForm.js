import {TextField} from "@mui/material";

export default function HalfInputForm({id, label, value}) {
    return (
        <TextField
            sx={{margin: '1%'}}
            required
            variant={"standard"}
            margin={'normal'}
            type={id}
            defaultValue={value}
            id={id}
            label={label}
            name={id}
            autoComplete={id}
            className={'half-input-auth'}
            autoFocus
        />
    )
}