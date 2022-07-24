import { LinearProgress, Stack } from "@mui/material"
import Paper from "@mui/material/Paper"
import { getURL } from "../helpers/config"
import useSWR from 'swr'
import styles from '../styles/photos-counter.module.scss'

type PhotoCounterProps = {
    username: string
}

/** The photo counter makes a request to the server and
 * shows the number of uploaded photos with the progress bar.
 * The maximum number of photos is 36.
 */
const PhotoCounter: React.FC<PhotoCounterProps> = (props: PhotoCounterProps) => {
    const endpoint = `/users/${props.username}/posts/count`
    const url = getURL(endpoint)
            
    const { data, error } = useSWR<number, Error>(url)

    if (error) return <div>Error</div>
    if (!data) return <div>Loading...</div>
    
    return (
        <Paper className={styles.Card} elevation={4}>
            <Stack spacing='15px' direction='row' alignItems={'center'}>
                <div>Photos: {data}/36</div>
                <LinearProgress className={styles.Progress} variant="determinate" value={data / 36 * 100} />
            </Stack>
        </Paper>
    )
}

export default PhotoCounter
