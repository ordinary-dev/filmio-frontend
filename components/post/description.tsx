import Skeleton from '@mui/material/Skeleton'
import styles from '../../styles/post.module.scss'

type DescriptionProps = {
    text?: string
}

const Description = (props: DescriptionProps) => {
    if (props.text) return (
        <div className={styles.Description}>{props.text}</div>
    )
    return (
        <Skeleton variant="rectangular" width={400} height={16} />
    )
}

export default Description