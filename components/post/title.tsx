import Skeleton from '@mui/material/Skeleton'

type TitleProps = {
    text?: string
}

const Title = (props: TitleProps) => {
    if (props.text) return (
        <div className="text-xl font-bold">{props.text}</div>
    )
    return (
        <Skeleton variant="rectangular" width={400} height={20} />
    )
}

export default Title
