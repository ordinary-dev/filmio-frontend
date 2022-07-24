import Stack from '@mui/material/Stack'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PhotoCounter from '../components/photos-counter'
import Post from '../components/post'
import ProfileCard from '../components/profile-card'
import useSWR from 'swr'
import { getURL } from '../helpers/config'

const Profile: NextPage = () => {
    const router = useRouter()
    const [username, setUsername] = useState<string|undefined>(undefined);

    useEffect(() => {
        if (router.isReady && router.query.username) {
            setUsername(router.query.username.toString())
        }
    }, [router.isReady, router.query])

    const { data, error } = useSWR<Array<string>, Error>(username ? getURL(`/users/${username}/posts`) : null)
    
    if (error) return <div>Error</div>
    if (!username || !data) return <div>Loading</div>

    return (
        <Stack direction='column' alignItems='center' spacing='30px'>
            <Head>
                <title>{getTitle(username)}</title>
            </Head>
            {username && <ProfileCard username={username} />}
            {username && <PhotoCounter username={username} />}
            {data.map((post, index) => (
                <Post key={index} postID={post}/>
            ))}
        </Stack>
    )
}

const getTitle = (username: string | undefined) => {
  if (username) {
    return `@${username} | Film.io`
  }
  return 'Film.io'
}

export default Profile
