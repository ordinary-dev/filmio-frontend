import Skeleton from '@mui/material/Skeleton'
import Image from 'next/image'
import React from 'react'
import styles from '../../styles/profile-card.module.scss'

type ProfilePictureProps = {
    url?: string
}

const ProfilePicture: React.FC<ProfilePictureProps> = (props: ProfilePictureProps) => {
    if (props.url) return (
        <Image className={styles.ProfilePhoto} alt='Profile picture' src={props.url} width={80} height={80} />
    )

    return (
        <Skeleton variant="circular" width={100} height={100} />
    )
}

export default ProfilePicture