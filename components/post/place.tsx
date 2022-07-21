import PlaceIcon from '@mui/icons-material/Place'
import styles from '../../styles/post.module.scss'
import Link from 'next/link'

type PlaceInfoProps = {
    place?: string
}

const PlaceInfo = (props: PlaceInfoProps) => {
    if (props.place) {
        return (
            <div className={styles.Info}>
                <PlaceIcon fontSize="inherit" />
                <Link href={`/place/${props.place}`}>
                    <a>{props.place}</a>
                </Link>
            </div>
        )
    }
    return <></>
}

export default PlaceInfo