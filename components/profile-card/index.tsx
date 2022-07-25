import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import React from 'react'
import { ProfileResponse } from '../../types/profile-response'
import ProfileName from './profile-name'
import ProfilePicture from './profile-picture'
import useSWR from 'swr'
import { getURL } from '../../helpers/config'
import { advFetch } from '../../helpers/fetchers'
import PhotoCounter from './photo-counter'

type ProfileCardProps = {
    username: string
}

/** Shows basic profile information.
 * */
const ProfileCard = (props: ProfileCardProps) => {
    const url = getURL('/me')
    const { data, error } = useSWR<ProfileResponse, Error>(url, advFetch)

    if (error) return <Paper className="w-full max-w-md p-4">Error</Paper>
    if (!data) return <Paper className="w-full max-w-md p-4">Loading...</Paper>

    const showUploadBtn = props.username === data.username
    
    return (
        <Paper className="w-full max-w-md p-4">
            <Stack spacing="1rem">
                <Stack direction="row" spacing="1rem">
                    <ProfilePicture url={data.profile_photo_url} />
                    <Stack justifyContent="space-around">
                        <ProfileName username={props.username} name={data.name} />
                        <Stack direction="row" spacing="1rem">
                            {showUploadBtn && <UploadButton />}
                            <Link href='/' passHref>
                                <a>
                                    <Button>Main page</Button>
                                </a>
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
                <PhotoCounter username={props.username} />
            </Stack>
        </Paper>
    )
}

const UploadButton = () => (
    <Link href="/upload" passHref>
        <a>
            <Button variant="contained" startIcon={<PhotoCamera />}>
                Upload Photo
            </Button>
        </a>
    </Link>
)

export default ProfileCard
