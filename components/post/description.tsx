type DescriptionProps = {
    text?: string
}

const Description = (props: DescriptionProps) => {
    if (props.text) return (
        <div>{props.text}</div>
    )
    return (
        <></>
    )
}

export default Description
