import { LinearProgress, Stack } from "@mui/material"
import Paper from "@mui/material/Paper"
import React, { useEffect, useState } from 'react'
import simpleGet from "../helpers/simple-fetch"
import styles from '../styles/photos-counter.module.scss'

type PhotoCounterProps = {
    username?: string
}

/** The photo counter makes a request to the server and
 * shows the number of uploaded photos with the progress bar.
 * The maximum number of photos is 36.
 */
const PhotoCounter: React.FC<PhotoCounterProps> = (props: PhotoCounterProps) => {
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        if (props.username) {
            simpleGet(`/users/${props.username}/posts/count`)
                .then((res: number) => {
                    setCount(res)
                })
                .catch(error => { console.log('PhotosCounter:', error) })
        }
    }, [props.username])
    return (
        <Paper className={styles.Card} elevation={4}>
            <Stack spacing='15px' direction='row' alignItems={'center'}>
                <div>Photos: {count}/36</div>
                <LinearProgress className={styles.Progress} variant="determinate" value={count / 36 * 100} />
            </Stack>
        </Paper>
    )
}

export default PhotoCounter