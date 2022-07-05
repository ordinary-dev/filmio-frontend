import { get_backend_address } from './config'

export default async function simpleGet(endpoint: string) {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    }
    return fetch(`${get_backend_address()}${endpoint}`, options)
        .then(res => res.json())
}

export async function simplePost(endpoint: string, payload: object) {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    return fetch(`${get_backend_address()}${endpoint}`, options)
        .then(res => res.json())
}