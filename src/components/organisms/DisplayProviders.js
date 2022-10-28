export default function DisplayProviders({providers}) {
    return(
        <div className={'providers'}>
            {providers.map(provider => provider)}
        </div>
    )
}