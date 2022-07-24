import Skeleton from '@mui/material/Skeleton'
import Image from 'next/image'
import React from 'react'
import styles from '../../styles/profile-card.module.scss'

type ProfilePictureProps = {
    url?: string
}

const ProfilePicture = (props: ProfilePictureProps) => {
    if (props.url) return (
        <Image className={styles.ProfilePhoto} alt='Profile picture' src={props.url} width={80} height={80} />
    )

    return (
        <Skeleton variant="circular" width={80} height={80} />
    )
}

export default ProfilePicture
