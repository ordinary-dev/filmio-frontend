import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Post from '../../components/post'
import { PostResponse } from '../../types/post-response'
import styles from '../../styles/place.module.scss'
import { getURL } from '../../helpers/config'
import useSWR from 'swr'

const PlaceSearchPage: NextPage = () => {
    const router = useRouter()
    const [place, setPlace] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (router.isReady && router.query.place) {
            setPlace(router.query.place.toString())
        }
    }, [router.isReady, router.query])

    const { data, error } = useSWR<Array<PostResponse>, Error>(place ? getURL(`/posts/location/${place}`) : null)

    if (error) return <div>Error</div>
    if (!data) return <div>Loading...</div>

    return (
        <Stack direction='column' alignItems='center' spacing='30px'>
            <Head>
                <title>Film.io</title>
            </Head>
            <Paper className={styles.Card}>
                <Stack direction='row' alignItems='center' spacing='15px'>
                    <Button className={styles.Button} onClick={() => router.back()}>
                        <ArrowBackIcon />
                    </Button>
                    <div className={styles.Title}>Posts from {place}</div>
                </Stack>
            </Paper>
            {data.map(post => (
                <Post postID={post.photo_id} key={post.photo_id} />
            ))}
        </Stack>
    )
}

export default PlaceSearchPage
