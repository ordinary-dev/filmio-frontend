import {get_backend_address} from './config'

export type TokenResponse = {
    access_token: string,
    token_type: string
}

const getToken = async (username: string, password: string) => {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
    }

    return fetch(`${get_backend_address()}/token`, options)
        .then(res => {
            if (res) return res.json()
        })
}

export default getToken