import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import secureGet from '../../helpers/secure-fetch'
import styles from '../../styles/post.module.scss'
import { PostResponse } from '../../types/post-response'
import DateInfo from './date'
import Description from './description'
import Photo from './photo'
import Title from './title'
import PlaceInfo from './place'
import EditButton from './edit-button'

type PostProps = {
  postID?: string
}

const Post: React.FC<PostProps> = (props: PostProps) => {
  const [postData, setPostData] = useState<PostResponse>({})

  useEffect(() => {
    if (props.postID) {
      secureGet(`/posts/${props.postID}`)
        .then((res: PostResponse) => {
          if (res) setPostData(res)
        })
        .catch(error => { console.log('Post:', error) })
    }
  }, [props.postID])

  return (
    <Paper className={styles.Card} elevation={4}>
      <Stack spacing='15px'>
        <Photo src={postData.photo_id} />
        <Title text={postData.title} />
        <Description text={postData.description} />

        <Stack spacing='15px' direction='row'>
          <DateInfo timestamp={postData.timestamp} />
          <PlaceInfo place={postData.place} />
          <EditButton author={postData.author} postID={props.postID} />
        </Stack>
      </Stack>
    </Paper>
  )
}

export default Post