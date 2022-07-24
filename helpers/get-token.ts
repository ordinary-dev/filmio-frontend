import { getURL } from './config'

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

    const url = getURL('/token')

    return fetch(url, options)
        .then(res => res.json())
}

export default getToken
