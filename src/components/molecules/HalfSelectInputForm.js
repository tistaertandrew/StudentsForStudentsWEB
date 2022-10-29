import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function HalfSelectInputForm({id, label, handleChange, inputs}) {
    return (
        <FormControl className={'half-input-auth'} sx={{margin: '5px'}}>
            <InputLabel>{label}</InputLabel>
            <Select
                variant={'outlined'}
                id={id}
                label={label}
                onChange={handleChange}
                name={id}
                autoComplete={id}
            >
                {inputs.map(input =>
                    <MenuItem value={input} key={input}>
                        {input}
                    </MenuItem>)}
            </Select>
        </FormControl>
    )
}