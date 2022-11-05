export default function TextAreaInputForm({id, label}) {
    return(
        <textarea
            id={id}
            name={id}
            className={'textarea-input'}
            placeholder={label}
        />
    )
}