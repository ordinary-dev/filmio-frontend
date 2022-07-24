import Post from './post'
import { getURL } from '../helpers/config'
import { PostResponse } from '../types/post-response'
import useSWR from 'swr'

/** Component that requests a random post */
const RandomPost = () => {
    const url = getURL('/posts/random')
    const { data, error } = useSWR<PostResponse, Error>(url)

    if (error) return <div>Error</div>
    if (!data) return <div>Loading...</div>

    return <Post postID={data.photo_id} />
}

export default RandomPost
