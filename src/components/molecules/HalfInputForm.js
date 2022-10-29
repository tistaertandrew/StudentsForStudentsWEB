import {TextField} from "@mui/material";

export default function HalfInputForm({id, label}) {
    return (
        <TextField
            sx={{margin: '5px'}}
            required
            variant={"filled"}
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