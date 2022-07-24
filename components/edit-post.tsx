import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import router from "next/router"
import React, { FormEvent } from "react"
import { getURL } from '../helpers/config'
import Cookies from 'js-cookie'
import { PostResponse } from "../types/post-response"
import useSWR from 'swr'

type NewPostProps = {
    src: string
}

interface NewPostForm extends HTMLFormElement {
    post_title: HTMLInputElement;
    description: HTMLInputElement;
    place: HTMLInputElement;
}

/** Form for filling in data about a post.
 * */
const EditPostForm: React.FC<NewPostProps> = (props: NewPostProps) => {
    const handlePostSubmit = (event: FormEvent) => {
        event.preventDefault()
        
        const token = Cookies.get('access_token')
        if (!token) return

        const target = event.target as NewPostForm
        const data = {
            title: target.post_title.value,
            description: target.description.value,
            place: target.place.value,
            photo_id: props.src
        }
        const endpoint = `/posts/${props.src}`
        const url = getURL(endpoint)
        const options = {
            method: 'PUT',
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


    const endpoint = `/posts/${props.src}`
    const url = getURL(endpoint)
            
    const { data, error } = useSWR<PostResponse, Error>(url)
            
    if (error) return <div>Error</div>
    if (!data) return <div>Loading...</div>
            
    return (
        <Paper className="w-full max-w-md p-4" elevation={4}>
            <Stack spacing='15px'>
                <form onSubmit={handlePostSubmit}>
                    <Stack spacing='15px'>
                        <TextField required name='post_title' label="Title" defaultValue={data.title} />
                        <TextField name='description' label="Description" defaultValue={data.description} />
                        <TextField name='place' label="Place" defaultValue={data.place} />
                        <Button type="submit" variant="contained">Save</Button>
                    </Stack>
                </form>
            </Stack>
        </Paper>
    )
}

export default EditPostForm
