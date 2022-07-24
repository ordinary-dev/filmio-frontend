import LogoutIcon from '@mui/icons-material/Logout'
import { Button, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ProfileResponse } from '../types/profile-response'
import { getURL } from '../helpers/config'
import { advFetch } from '../helpers/fetchers'
import styles from '../styles/description.module.scss'
import useSWR from 'swr'


/** Panel with site name, description and buttons for further actions */
const Description = () => {
    const [token, setToken] = useState<string>('')
    useEffect(() => {
        const tokenCookie = Cookies.get('access_token')
        if (tokenCookie) setToken(tokenCookie)
    }, [])
    return (
        <Paper className={styles.Card} elevation={4}>
            <Stack spacing='15px'>
                <div className={styles.Title}>Film.io</div>
                <div>
                    Your personal album.
                    Don&apos;t forget that you can only upload 36 photos.
                    What photos will you choose?
                </div>
                <ActionPanel token={token} setToken={setToken} />
            </Stack>
        </Paper>
    )
}

type ActionPanelProps = {
    /** JWT token to access the account */
    token?: string,
    /** Function that will be passed to logout button */
    setToken?: Dispatch<SetStateAction<string>>
}

/** A panel that, depending on the presence of a token,
 * shows either a button to go to the profile and a logout button,
 * or a button for authorization */
const ActionPanel: React.FC<ActionPanelProps> = (props: ActionPanelProps) => {
    if (props.token) return (
        <Stack direction='row' spacing='15px'>
            <ProfileButton />
            <LogoutButton setToken={props.setToken} />
        </Stack>
    )
    return (
        <Link href='/login' passHref>
            <a>
                <Button className={styles.ProfileButton} variant='contained'>
                    Get started
                </Button>
            </a>
        </Link>
    )
}

/** Button with a link to user's profile.
 * The button makes a request to the server to find out the current username.
 */
const ProfileButton = () => {
    /* Try to get the username */
    const url = getURL('/me/')
    const { data, error } = useSWR<ProfileResponse, Error>(url, advFetch)        

    if (error) return <div>Error: {error.message}</div>
    if (!data) return (
        <Button className={styles.ProfileButton} disabled={true} variant='contained'>
            Loading...
        </Button>
    )

    /* If the username was successfully obtained  */
    return (
        <Link href={`/${data.username}`} passHref>
            <a className={styles.ProfileLink}>
                <Button className={styles.ProfileButton} variant='contained'>
                    My profile
                </Button>
            </a>
        </Link>
    )
}


type LogoutButtonProps = {
    /** Optional function from React.useState to reset token variable */
    setToken?: Dispatch<SetStateAction<string>>
}

/** Small button that deletes access token cookie and resets token variable */
const LogoutButton: React.FC<LogoutButtonProps> = (props: LogoutButtonProps) => {
    const handleClick = () => {
        Cookies.remove('access_token')
        if (props.setToken) props.setToken('')
    }
    return (
        <Button onClick={handleClick} className={styles.LogoutButton}>
            <LogoutIcon />
        </Button>
    )
}

export default Description
