import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import router from "next/router"
import React, { FormEvent } from "react"
import { getURL } from '../helpers/config'
import Cookies from 'js-cookie'
import Photo from "./post/photo"

type NewPostProps = {
    postID?: string
}

interface NewPostForm extends HTMLFormElement {
    post_title: HTMLInputElement;
    description: HTMLInputElement;
    place: HTMLInputElement;
}

/** Form for filling in data about a new post.
 * Appears if there is an id of the uploaded photo.
 * */
const NewPost = (props: NewPostProps) => {
    const handlePostSubmit = (event: FormEvent) => {
        event.preventDefault()
        
        const token = Cookies.get('access_token')
        if (!token) return
        
        const target = event.target as NewPostForm
        const data = {
            title: target.post_title.value,
            photo_id: props.postID
        }
        const url = getURL('/posts/')
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(url, options)
            .then(res => res.json())
            .then(res => console.log('Response:', res))
            .catch(error => { console.log('NewPost:', error) })
        target.reset()
        router.push('/')
            .catch(error => { console.log('NewPost / Router:', error) })
    }

    if (props.postID) return (
        <Paper className="max-w-md w-full p-4" elevation={4}>
            <Stack spacing='15px'>
                <Photo src={props.postID} />
                <form onSubmit={handlePostSubmit}>
                    <Stack spacing='15px'>
                        <TextField required name='post_title' label="Title" />
                        <Button type="submit" variant="contained">Save</Button>
                    </Stack>
                </form>
            </Stack>
        </Paper>
    )
    return <div></div>
}

export default NewPost
