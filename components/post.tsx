import AccessTimeIcon from '@mui/icons-material/AccessTime'
import NumbersIcon from '@mui/icons-material/Numbers'
import PlaceIcon from '@mui/icons-material/Place'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import styles from '../styles/post.module.scss'

type PostProps = {
  src?: string,
  title?: string,
  alt?: string,
  width?: number,
  height?: number,
  description?: string,
  index?: number,
  timestamp?: number,
  place?: string
}

const Post: React.FC<PostProps> = (props: PostProps) => {
  const date = props.timestamp ? new Date(props.timestamp * 1000) : null
  return (
    <Paper className={styles.Card} elevation={4}>
      <Stack spacing='15px'>

        <Photo src={props.src} width={props.width} height={props.height} />

        {props.title && <div className={styles.Title}>{props.title}</div>}
        {!props.title && <Skeleton variant="rectangular" width={400} height={20} />}

        {props.description && <div className={styles.Description}>{props.description}</div>}
        {!props.description && <Skeleton variant="rectangular" width={400} height={16} />}

        <Stack spacing='15px' direction='row'>
          {props.index && <div className={styles.Info}><NumbersIcon fontSize="inherit" />{props.index}</div>}
          {date && <div className={styles.Info}><AccessTimeIcon fontSize="inherit" />{date.toLocaleString('en-US')}</div>}
          {props.place && <div className={styles.Info}><PlaceIcon fontSize="inherit" />{props.place}</div>}
        </Stack>
      </Stack>
    </Paper>
  )
}

type PhotoProps = {
  src?: string | null,
  width?: number | null | undefined,
  height?: number | null | undefined,
  alt?: string
}

export const Photo: React.FC<PhotoProps> = (props: PhotoProps) => {
  const alt = props.alt ? props.alt : 'Photo'
  let width = 400
  let height = 300
  if (props.width && props.height) {
    const div = props.width > props.height ? props.width / width : props.height / height
    width = props.width / div
    height = props.height / div
  }
  if (props.src) {
    const src = props.src.startsWith('http://') ? props.src : 'http://localhost:8000/photos/' + props.src + '/content'
    return (
      <div className={styles.Placeholder}>
        <Image src={src} width={width} height={height} alt={alt} />
      </div>
    )
  }
  return <Skeleton variant="rectangular" width={width} height={height} />
}

export default Post