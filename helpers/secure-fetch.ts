import Cookies from "js-cookie"
import { get_backend_address } from './config'

export default async function secureGet(endpoint: string, token?: string) {
    token = token ? token : Cookies.get('access_token')

    if (token) {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        return fetch(`${get_backend_address()}${endpoint}`, options)
            .then(res => res.json())
    }

    return null
}

export async function securePost(endpoint: string, payload: object, token?: string) {
    token = token ? token : Cookies.get('access_token')

    if (token) {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
        return fetch(`${get_backend_address()}${endpoint}`, options)
            .then(res => res.json())
    }

    return null
}