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

    if (error) return <div className="text-xs font-mono">Error</div>
    if (!data) return <div className="text-xs font-mono">Loading...</div>

    const editURL = `/edit/${encodeURI(props.postID)}`

    if (props.author === data.username) return (
        <div className="text-xs font-mono">
            <Link href={editURL} passHref>
                <a>Edit</a>
            </Link>
        </div>
    )
    
    return <></>
}

export default EditButton
