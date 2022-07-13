import styles from '../../styles/post.module.scss'

type DescriptionProps = {
    text?: string
}

const Description = (props: DescriptionProps) => {
    if (props.text) return (
        <div className={styles.Description}>{props.text}</div>
    )
    return (
        <></>
    )
}

export default Description