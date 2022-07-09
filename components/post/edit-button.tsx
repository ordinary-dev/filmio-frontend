import styles from '../../styles/post.module.scss'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import secureGet from '../../helpers/secure-fetch'
import { ProfileResponse } from '../../types/profile-response'

type EditButtonProps = {
    author?: string,
    postID?: string
}

const EditButton = (props: EditButtonProps) => {
    const [myUsername, setMyUsername] = useState<string | undefined>(undefined)
    useEffect(() => {
        secureGet('/me')
            .then((res: ProfileResponse) => {
                if (res) setMyUsername(res.username)
            })
            .catch(error => { console.log('Post:', error) })
    }, [])
    if (props.author === myUsername && props.postID) return (
        <div className={styles.Info}>
            <Link href={`/edit/${encodeURI(props.postID)}`}><a>Edit</a></Link>
        </div>
    )
    return <div></div>
}

export default EditButton