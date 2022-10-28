export default function DisplayProvider({imageUrl, alt}) {
    return (
        <img src={imageUrl} alt={alt} className={'provider'}/>
    )
}