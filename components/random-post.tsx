import Post from './post'
import secureGet from '../helpers/secure-fetch'
import { useEffect, useState } from 'react'
import { PostResponse } from '../types/post-response'

/** Component that requests a random post */
const RandomPost: React.FC = () => {
    const [randomPost, setRandomPost] = useState<PostResponse | null>(null)
    useEffect(() => {
        secureGet('/posts/random')
            .then((post: PostResponse) => {
                if (post) setRandomPost(post)
            })
            .catch(error => { console.log('RandomPost:', error) })
    }, [])
    if (randomPost) return (
        <Post postID={randomPost.photo_id} />
    )
    return <Post />
}

export default RandomPost
