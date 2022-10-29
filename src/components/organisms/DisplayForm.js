import {Box} from "@mui/material";
import HiddenInputForm from "../molecules/HiddenInputForm";

export default function DisplayForm({handleSubmit, hiddenInput, inputs, disablePassword}) {
    const handleHiddenInput = () => {
        if (hiddenInput) {
            return <HiddenInputForm id={'hidden'} value={hiddenInput}/>
        }
    }

    const handleDisablePassword = () => {
        if (disablePassword) {
            return inputs.map((input, index) => {
                if (index !== inputs.length - 2) return input })
        } else {
            return inputs.map(input => input)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate className={'form-auth'} sx={{mt: 1}}>
            {handleHiddenInput()}
            {handleDisablePassword()}
        </Box>
    )
}