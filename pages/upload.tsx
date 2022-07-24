import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from '@mui/material/Stack'
import router from "next/router"
import { ChangeEvent, FormEvent, useState } from "react"
import NewPost from "../components/new-post"
import styles from '../styles/upload.module.scss'
import { getURL } from '../helpers/config'
import Cookies from 'js-cookie'

interface FileUploadForm extends HTMLFormElement {
    file: HTMLInputElement;
}

type PhotoResponse = {
    width: number,
    height: number,
    hash: string
}

const Upload = () => {
    const [postID, setPostID] = useState<string | undefined>(undefined)
    const [uplBtnText, setUplBtnText] = useState<string>('Select file')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        const token = Cookies.get('access_token')
        if (!token) return

        const target = event.target as FileUploadForm
        if (target.file.files && target.file.files.length >= 1) {
            const file = target.file.files[0]
            const formData = new FormData()
            formData.append("file", file)

            // Upload file and get it's filename
            const url = getURL('/photos/')
            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                },
                body: formData
            }
            fetch(url, options)
                .then(res => res.json())
                .then((result: PhotoResponse) => {
                    setPostID(result.hash)
                })
                .catch(error => { console.log('Upload:', error) })
            target.reset()
        }
    }

    const handleInputChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        if (target && target.files) setUplBtnText('Select file (' + target.files[0].name + ')')
        else setUplBtnText('Select file')
    }

    return (
        <Stack spacing='30px' alignItems={'center'}>
            <Paper className={styles.Card} elevation={4}>
                <Stack spacing={'15px'}>
                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <Button type="submit" onClick={() => router.back()}>
                            <ArrowBackIcon />
                        </Button>
                        <div className={styles.Title}>Upload photo</div>
                    </Stack>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={'15px'}>
                            <div className={styles.FileInputContainer}>
                                <Button className={styles.FileInputButton} variant='outlined'>
                                    {uplBtnText}
                                </Button>
                                <input onChange={handleInputChange} className={styles.FileInput} name='file' type="file"></input>
                            </div>
                            <Button type="submit" variant="contained">Upload</Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
            <NewPost postID={postID} />
        </Stack>
    )
}

export default Upload
