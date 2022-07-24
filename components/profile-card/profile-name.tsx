import React from 'react'
import styles from '../../styles/profile-card.module.scss'

type ProfileNameProps = {
    username: string,
    name?: string
}

/** The component tries to get user data and shows it */
const ProfileName = (props: ProfileNameProps) => {
    /* If name was set */
    if (props.name) return (
        <div className={styles.Name}>
            {props.name} <span className={styles.Username}>@{props.username}</span>
        </div>
    )

    /* If name is unknown */
    return (
        <div className={styles.Name}>@{props.username}</div>
    )
}

export default ProfileName
