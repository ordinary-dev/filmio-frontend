import AccessTimeIcon from '@mui/icons-material/AccessTime'
import InfoPanel from './info-panel'

type DateInfoProps = {
    timestamp?: number
}

const DateInfo = (props: DateInfoProps) => {
    if (props.timestamp) {
        const date = new Date(props.timestamp * 1000).toLocaleString('en-US')
        const icon = <AccessTimeIcon fontSize="inherit" />
        return (
            <InfoPanel icon={icon} text={date} />
        )
    }
    return <></>
}

export default DateInfo
