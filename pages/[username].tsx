import Stack from '@mui/material/Stack'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PhotoCounter from '../components/photos-counter'
import Post from '../components/post'
import ProfileCard from '../components/profile-card'
import simpleGet from '../helpers/simple-fetch'

type Post = {
  title: string,
  description: string,
  place: string,
  photo_id: string,
  photo_width: number,
  photo_height: number,
  timestamp: number
}

const Profile: NextPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState<string|undefined>(undefined);

  useEffect(() => {
    if (router.isReady && router.query.username) {
      setUsername(router.query.username.toString())
    }
  }, [router.isReady, router.query])

  const [postsCount, setPostsCount] = useState<number>(0)
  const [posts, setPosts] = useState<Array<Post>>([])
  useEffect(() => {
    if (username) {
      simpleGet(`/posts/${username}`)
        .then((res: Array<Post>) => {
          setPostsCount(res.length)
          setPosts(res)
        })
        .catch(error => { console.log(error) })
    }
  }, [username])

  return (
    <Stack direction='column' alignItems='center' spacing='30px'>
      <Head>
        <title>{getTitle(username)}</title>
      </Head>
      <ProfileCard username={username} />
      <PhotoCounter username={username} />
        {posts && Array.isArray(posts) && posts.map((post, index) => (
              <Post
                key={`${post.timestamp}${post.photo_id}`}
                src={post.photo_id}
                title={post.title}
                alt={post.title}
                width={post.photo_width}
                height={post.photo_height}
                description={post.description}
                index={postsCount - index}
                timestamp={post.timestamp}
                place={post.place} />
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