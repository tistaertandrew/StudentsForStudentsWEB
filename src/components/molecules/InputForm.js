import {TextField} from "@mui/material";

export default function InputForm({id, label}) {
    return (
        <TextField
            required
            variant={"filled"}
            margin={'normal'}
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