import Skeleton from '@mui/material/Skeleton'
import styles from '../../styles/post.module.scss'

type TitleProps = {
    text?: string
}

const Title = (props: TitleProps) => {
    if (props.text) return (
        <div className={styles.Title}>{props.text}</div>
    )
    return (
        <Skeleton variant="rectangular" width={400} height={20} />
    )
}

export default Title