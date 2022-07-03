import Skeleton from '@mui/material/Skeleton'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/profile-card.module.scss'
import simpleGet from '../../helpers/simple-fetch'
import { ProfileResponse } from '../../types/profile-response'

type ProfileNameProps = {
    username?: string
}

/** The component tries to get user data and shows it */
const ProfileName: React.FC<ProfileNameProps> = (props: ProfileNameProps) => {
    const [name, setName] = useState<string | undefined>(undefined)
    /* Try to get the name from the server */
    useEffect(() => {
        setName(undefined)
        if (props.username) {
            simpleGet(`/users/${props.username}`)
                .then((res: ProfileResponse) => {
                    if (res && res.name) {
                        setName(res.name)
                    }
                })
                .catch(error => { console.log('ProfileName:', error) })
        }
    }, [props.username])

    /* If all data is known */
    if (props.username && name) return (
        <div className={styles.Name}>
            {name} <span className={styles.Username}>@{props.username}</span>
        </div>
    )

    /* If name is unknown */
    if (props.username) return (
        <div className={styles.Name}>@{props.username}</div>
    )

    /* No data */
    return <Skeleton variant='rectangular' height='20px' />
}

export default ProfileName