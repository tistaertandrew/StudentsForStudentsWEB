import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function EmptyContent({message}) {
    return (
        <div className={'loading-message'}>
            <SentimentDissatisfiedIcon sx={{color: 'black', transform: 'scale(2)'}}/>
            <h1>{message}</h1>
        </div>
    )


}