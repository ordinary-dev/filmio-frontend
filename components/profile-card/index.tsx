import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ProfileResponse } from '../../types/profile-response'
import secureGet from '../../helpers/secure-fetch'
import styles from '../../styles/profile-card.module.scss'
import ProfileName from './profile-name'
import ProfilePicture from './profile-picture'

type ProfileCardProps = {
    username?: string
}

/** Shows basic profile information.
 * If the user is authorized, offers to upload a new photo */
const ProfileCard: React.FC<ProfileCardProps> = (props: ProfileCardProps) => {
    const [allow_editing, setAllowEditing] = useState<boolean>(false)
    const [profilePhoto, setProfilePhoto] = useState<string|undefined>(undefined)

    useEffect(() => {
        if (props.username) {
            secureGet('/me')
                .then((res: ProfileResponse) => {
                    if (res && res.username) {
                        setAllowEditing(props.username === res.username)
                        setProfilePhoto(res.profile_photo_url)
                    }
                }).catch(error => { console.log(error) })
        }
    }, [props.username])

    return (
        <Paper className={styles.ProfileCard}>
            <Stack direction='row' spacing='15px'>
                <ProfilePicture url={profilePhoto} />
                <Stack justifyContent='space-around'>
                    <ProfileName username={props.username} />
                    <Stack direction='row' spacing='15px'>
                        {allow_editing && <Link href='/upload' passHref>
                            <a>
                                <Button variant="contained" startIcon={<PhotoCamera />}>
                                    Upload photo
                                </Button>
                            </a>
                        </Link>}
                        <Link href='/' passHref><a><Button>Main page</Button></a></Link>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default ProfileCard