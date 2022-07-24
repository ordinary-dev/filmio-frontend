import Image from 'next/image'
import useSWR from 'swr'
import { getURL } from '../../helpers/config'

type PhotoProps = {
    src: string,
    alt?: string
}

type PhotoInfo = {
    height: number,
    width: number
}

const Photo = (props: PhotoProps) => {
    const alt = props.alt ? props.alt : 'Photo'
    let width = 400
    let height = 300

    const infoUrl = getURL(`/photos/${props.src}/info`)
    const { data, error } = useSWR<PhotoInfo, Error>(infoUrl)

    if (error) return <div>Error</div>
    if (!data) return <div>Loading...</div>

    // Calculate new width and height
    const div = data.width > data.height ? data.width / width : data.height / height
    width = data.width / div
    height = data.height / div

    const photoUrl = getURL(`/photos/${props.src}/content`)
    return (
        <div className="mx-auto">
            <Image src={photoUrl} width={width} height={height} alt={alt} />
        </div>
    )
}

export default Photo
