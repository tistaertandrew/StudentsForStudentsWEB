import {TextField} from "@mui/material";

export default function HalfInputForm({id, label}) {
    return (
        <TextField
            sx={{margin: '1%'}}
            required
            variant={"standard"}
            margin={'normal'}
            type={id}
            id={id}
            label={label}
            name={id}
            autoComplete={id}
            className={'half-input-auth'}
            autoFocus
        />
    )
}