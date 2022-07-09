import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import router from "next/router"
import React, { FormEvent } from "react"
import { securePost } from '../helpers/secure-fetch'
import styles from '../styles/new-post.module.scss'
import { Photo } from "./post"

type NewPostProps = {
    src?: string,
    imgWidth: number,
    imgHeight: number
}

interface NewPostForm extends HTMLFormElement {
    post_title: HTMLInputElement;
    description: HTMLInputElement;
    place: HTMLInputElement;
}

/** Form for filling in data about a new post.
 * Appears if there is an id of the uploaded photo.
 * */
const NewPost: React.FC<NewPostProps> = (props: NewPostProps) => {
    const handlePostSubmit = (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as NewPostForm
        const data = {
            title: target.post_title.value,
            description: target.description.value,
            place: target.place.value,
            photo_id: props.src
        }

        securePost('/posts/', data)
            .catch(error => { console.log('NewPost:', error) })
        target.reset()
        router.push('/')
            .catch(error => { console.log('NewPost / Router:', error) })
    }

    if (props.src) return (
        <Paper className={styles.Card} elevation={4}>
            <Stack spacing='15px'>
                <Photo src={props.src} width={props.imgWidth} height={props.imgHeight} />
                <form onSubmit={handlePostSubmit}>
                    <Stack spacing='15px'>
                        <TextField required name='post_title' label="Title" />
                        <TextField required name='description' label="Description" />
                        <TextField required name='place' label="Place" />
                        <Button type="submit" variant="contained">Save</Button>
                    </Stack>
                </form>
            </Stack>
        </Paper>
    )
    return <div></div>
}

export default NewPost