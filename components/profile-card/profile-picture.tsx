import FileUploadIcon from '@mui/icons-material/FileUpload'
import Skeleton from '@mui/material/Skeleton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/profile-card.module.scss'

type ProfilePictureProps = {
    url?: string,
    allow_editing?: boolean
}

const ProfilePicture: React.FC<ProfilePictureProps> = (props: ProfilePictureProps) => {
    if (props.url) return (
        <Image alt='Profile picture' src={props.url} width={100} height={100} />
    )
    if (props.allow_editing) return (
        <Link href='/profile-picture' passHref>
            <a>
                <div className={styles.ProfilePictureContainer}>
                    <Skeleton variant="circular" width={100} height={100} />
                    <div className={styles.NewProfilePicture} >
                        <FileUploadIcon />
                    </div>
                </div>
            </a>
        </Link>
    )

    return (
        <Skeleton variant="circular" width={100} height={100} />
    )
}

export default ProfilePicture