import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Post from '../../components/post'
import secureGet from '../../helpers/secure-fetch'
import { PostResponse } from '../../types/post-response'
import styles from '../../styles/place.module.scss'


const PlaceSearchPage: NextPage = () => {
    const router = useRouter()
    const [place, setPlace] = useState<string | undefined>(undefined)
    const [posts, setPosts] = useState<Array<PostResponse>>([])

    useEffect(() => {
        if (router.isReady && router.query.place) {
            setPlace(router.query.place.toString())
            secureGet(`/posts/location/${router.query.place.toString()}`)
                .then((res: Array<PostResponse>) => {
                    setPosts(res)
                })
                .catch(err => console.log('PlaceSearch: ', err))
        }
    }, [router.isReady, router.query])

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
            {posts.map(post => (
                <Post postID={post.photo_id} key={post.photo_id} />
            ))}
        </Stack>
    )
}

export default PlaceSearchPage