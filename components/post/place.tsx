import PlaceIcon from '@mui/icons-material/Place'
import Link from 'next/link'
import InfoPanel from './info-panel'

type PlaceInfoProps = {
    place?: string
}

const PlaceInfo = (props: PlaceInfoProps) => {
    if (props.place) {
        const url = `/place/${props.place}`
        const icon = <PlaceIcon fontSize="inherit" />
        return (
            <Link href={url} passHref>
                <a>
                    <InfoPanel icon={icon} text={props.place} />
                </a>
            </Link>
        )
    }
    return <></>
}

export default PlaceInfo
