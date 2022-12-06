import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function LessThanHalfSelectInputForm({id, label, handleChange, inputs}) {
    return (
        <FormControl className={'less-half-input-auth'} sx={{margin: '1%'}}>
            <InputLabel sx={{margin: '5px'}}>{label}</InputLabel>
            <Select
                variant={'standard'}
                id={id}
                label={label}
                onChange={handleChange}
                name={id}
                disabled={inputs.length === 0}
                autoComplete={id}
            >
                {inputs.map(input =>
                    <MenuItem value={input.id} key={input.id}>
                        {input.content ?? input.label}
                    </MenuItem>)}
            </Select>
        </FormControl>
    )
}