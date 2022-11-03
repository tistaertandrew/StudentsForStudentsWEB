import {Box} from "@mui/material";
import HiddenInputForm from "../molecules/HiddenInputForm";

export default function DisplayForm({handleSubmit, inputs}) {
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate className={'form-auth'} sx={{mt: 1}}>
            {inputs.map(input => input)}
        </Box>
    )
}