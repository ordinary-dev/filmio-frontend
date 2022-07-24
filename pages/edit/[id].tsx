import Stack from '@mui/material/Stack'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import EditPostForm from '../../components/edit-post'
import Post from '../../components/post'


const EditPage: NextPage = () => {
    const router = useRouter()
    const [id, setId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (router.isReady && router.query.id) {
            setId(router.query.id.toString())
        }
    }, [router.isReady, router.query])

    return (
        <Stack direction='column' alignItems='center' spacing='30px'>
            <Head>
                <title>Edit post | Film.io</title>
            </Head>
            {id && <Post postID={id} /> }
            {id && <EditPostForm src={id} />}
        </Stack>
    )
}

export default EditPage
