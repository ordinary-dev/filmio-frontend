import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import router from "next/router"
import React, { FormEvent, useEffect, useState } from "react"
import secureGet, { securePut } from '../helpers/secure-fetch'
import styles from '../styles/new-post.module.scss'
import { PostResponse } from "../types/post-response"

type NewPostProps = {
    src?: string,
    imgWidth?: number,
    imgHeight?: number
}

interface NewPostForm extends HTMLFormElement {
    post_title: HTMLInputElement;
    description: HTMLInputElement;
    place: HTMLInputElement;
}

/** Form for filling in data about a new post.
 * Appears if there is an id of the uploaded photo.
 * */
const EditPostForm: React.FC<NewPostProps> = (props: NewPostProps) => {
    const handlePostSubmit = (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as NewPostForm
        const data = {
            title: target.post_title.value,
            description: target.description.value,
            place: target.place.value,
            photo_id: props.src
        }
        if (props.src) {
            securePut(`/posts/${props.src}`, data)
                .catch(error => { console.log('NewPost:', error) })
            target.reset()
            router.push('/')
                .catch(error => { console.log('NewPost / Router:', error) })
        }
    }

    const [title, setTitle] = useState<string | undefined>(undefined)
    const [description, setDescription] = useState<string | undefined>(undefined)
    const [place, setPlace] = useState<string | undefined>(undefined)
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (props.src) {
            secureGet(`/posts/${props.src}`)
                .then((res: PostResponse) => {
                    setTitle(res.title)
                    setDescription(res.description)
                    setPlace(res.place)
                    setLoaded(true)
                })
                .catch(error => { console.log('EditPostForm:', error) })
        }
    }, [props.src])

    if (props.src && loaded) return (
        <Paper className={styles.Card} elevation={4}>
            <Stack spacing='15px'>
                <form onSubmit={handlePostSubmit}>
                    <Stack spacing='15px'>
                        <TextField required name='post_title' label="Title" defaultValue={title} />
                        <TextField name='description' label="Description" defaultValue={description} />
                        <TextField name='place' label="Place" defaultValue={place} />
                        <Button type="submit" variant="contained">Save</Button>
                    </Stack>
                </form>
            </Stack>
        </Paper>
    )
    return <div></div>
}

export default EditPostForm