import AccessTimeIcon from '@mui/icons-material/AccessTime'
import styles from '../../styles/post.module.scss'

type DateInfoProps = {
    timestamp?: number
}

const DateInfo = (props: DateInfoProps) => {
    if (props.timestamp) {
        const date = new Date(props.timestamp * 1000).toLocaleString('en-US')
        return (
            <div className={styles.Info}>
                <AccessTimeIcon fontSize="inherit" />
                {date}
            </div>
        )
    }
    return <></>
}

export default DateInfo