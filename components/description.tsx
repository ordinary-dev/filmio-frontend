import LogoutIcon from '@mui/icons-material/Logout'
import { Button, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ProfileResponse } from '../types/profile-response'
import secureGet from '../helpers/secure-fetch'
import styles from '../styles/description.module.scss'

/** Panel with site name, description and buttons for further actions */
const Description: React.FC = () => {
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
const ProfileButton: React.FC = () => {
    /* Try to get the username */
    const [username, setUsername] = useState<string | null>(null)
    useEffect(() => {
        secureGet('/me/')
            .then((response: ProfileResponse) => {
                setUsername(response.username)
            })
            .catch(error => {
                console.log('Description / ProfileButton:', error)
            })
    }, [])
    /* If the username was successfully obtained  */
    if (username) return (
        <Link href={`/${username}`} passHref>
            <a className={styles.ProfileLink}>
                <Button className={styles.ProfileButton} variant='contained'>
                    My profile
                </Button>
            </a>
        </Link>
    )
    /* Return inactive button if the username is unknown */
    return (
        <Button className={styles.ProfileButton} disabled={true} variant='contained'>
            My profile
        </Button>
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