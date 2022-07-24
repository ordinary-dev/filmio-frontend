import styles from '../../styles/post.module.scss'
import Link from 'next/link'
import { getURL } from '../../helpers/config'
import { advFetch } from '../../helpers/fetchers'
import { ProfileResponse } from '../../types/profile-response'
import useSWR from 'swr'


type EditButtonProps = {
    author: string,
    postID: string
}

const EditButton = (props: EditButtonProps) => {
    const url = getURL('/me/')
    const { data, error } = useSWR<ProfileResponse, Error>(url, advFetch)

    if (error) return <div>Error</div>
    if (!data) return <div>Loading...</div>

    const editURL = `/edit/${encodeURI(props.postID)}`

    if (props.author === data.username) return (
        <div className={styles.Info}>
            <Link href={editURL} passHref>
                <a>Edit</a>
            </Link>
        </div>
    )
    
    return <></>
}

export default EditButton
