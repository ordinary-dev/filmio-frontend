type ProfileNameProps = {
    username: string,
    name?: string
}

/** The component tries to get user data and shows it */
const ProfileName = (props: ProfileNameProps) => {
    /* If name was set */
    if (props.name) return (
        <div className="text-xl font-bold">
            {props.name} <span className="text-gray-800">@{props.username}</span>
        </div>
    )

    /* If name is unknown */
    return (
        <div className="text-xl font-bold">@{props.username}</div>
    )
}

export default ProfileName
