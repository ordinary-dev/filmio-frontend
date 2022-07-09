import Skeleton from '@mui/material/Skeleton'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { get_backend_address } from '../../helpers/config'
import secureGet from '../../helpers/secure-fetch'
import styles from '../../styles/post.module.scss'

type PhotoProps = {
    src?: string,
    alt?: string
}

type PhotoInfo = {
    height?: number,
    width?: number
}

export const Photo: React.FC<PhotoProps> = (props: PhotoProps) => {
    const alt = props.alt ? props.alt : 'Photo'
    let width = 400
    let height = 300
    const [photoInfo, setPhotoInfo] = useState<PhotoInfo>({})

    useEffect(() => {
        if (props.src) {
            secureGet(`/photos/${props.src}/info`)
                .then((res: PhotoInfo) => {
                    if (res) setPhotoInfo(res)
                })
                .catch(error => { console.log('Post / Photo:', error) })
        }
    }, [props.src])

    if (photoInfo.width && photoInfo.height) {
        const div = photoInfo.width > photoInfo.height ? photoInfo.width / width : photoInfo.height / height
        width = photoInfo.width / div
        height = photoInfo.height / div
    }

    if (photoInfo.width && photoInfo.height && props.src) {
        const src = props.src.startsWith('http://') ? props.src : `${get_backend_address()}/photos/` + props.src + '/content'
        return (
            <div className={styles.Placeholder}>
                <Image src={src} width={width} height={height} alt={alt} />
            </div>
        )
    }
    return <Skeleton variant="rectangular" width={width} height={height} />
}

export default Photo