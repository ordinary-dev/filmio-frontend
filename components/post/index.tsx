import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { PostResponse } from '../../types/post-response'
import DateInfo from './date'
import Description from './description'
import Photo from './photo'
import Title from './title'
import PlaceInfo from './place'
import EditButton from './edit-button'
import { getURL } from '../../helpers/config'
import useSWR from 'swr'


type PostProps = {
    postID: string
}

const Post = (props: PostProps) => {
    const url = getURL(`/posts/${props.postID}`)
    const { data, error } = useSWR<PostResponse, Error>(url)

    if (error) return <div>Error</div>
    if (!data) return <div>Loading...</div>

    return (
        <Paper className="p-4 w-full max-w-md">
            <Stack spacing='15px'>
                <Photo src={data.photo_id} />
                <Title text={data.title} />
                <Description text={data.description} />

                <Stack spacing='15px' direction='row' alignItems='center'>
                    <DateInfo timestamp={data.timestamp} />
                    <PlaceInfo place={data.place} />
                    <EditButton author={data.author} postID={props.postID} />
                </Stack>
            </Stack>
        </Paper>
    )
}

export default Post
