import Link from 'next/link'
import { getURL } from '../../helpers/config'
import { advFetch } from '../../helpers/fetchers'
import { ProfileResponse } from '../../types/profile-response'
import useSWR from 'swr'
import EditIcon from '@mui/icons-material/Edit'
import InfoPanel from './info-panel'

type EditButtonProps = {
    author: string,
    postID: string
}

const EditButton = (props: EditButtonProps) => {
    const url = getURL('/me')
    const { data, error } = useSWR<ProfileResponse, Error>(url, advFetch)

    if (error) return <div className="text-xs font-mono">Error</div>
    if (!data) return <div className="text-xs font-mono">Loading...</div>

    const editURL = `/edit/${encodeURI(props.postID)}`
    const icon = <EditIcon fontSize="inherit" />

    if (props.author === data.username) return (
        <Link href={editURL} passHref>
            <a>
                <InfoPanel icon={icon} text="Edit" />
            </a>
        </Link>
    )
    
    return <></>
}

export default EditButton
