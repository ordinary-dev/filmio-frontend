import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Cookies from 'js-cookie'
import router from 'next/router'
import React, { FormEvent } from 'react'
import getToken, { TokenResponse } from '../../helpers/get-token'
import { LoginForm } from './login-panel'
import { getURL } from '../../helpers/config'


/** Interface with name, username and password */
interface RegisterForm extends LoginForm {
    email: HTMLInputElement;
}

/** Form with name, username and password.
 * Registers a user and tries to get a token.
 * If successful, redirects to the new profile page. */
const RegistrationPanel: React.FC = () => (
    <form onSubmit={handleFormSubmit}>
        <Stack spacing={'15px'}>
            <TextField required label='Username' name='username' />
            <TextField required label='Email' name='email' />
            <TextField required label='Password' type='password' name='password' />
            <Button type='submit' variant="contained">Register</Button>
        </Stack>
    </form>
)

const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as RegisterForm
    const data = {
        username: target.username.value,
        email: target.email.value,
        password: target.password.value
    }
    const url = getURL('/users')
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    fetch(url, options)
        .then(res => res.json())
        .then(() => {
            tryToLogin(target.username.value, target.password.value)
        })
        .catch(error => {
            console.error('RegistrationPanel:', error);
        })
}

const tryToLogin = (username: string, password: string) => {
    getToken(username, password)
        .then((result: TokenResponse) => {
            if (result.access_token) {
                Cookies.set('access_token', result.access_token, { expires: 365 })
                router.push(`/${username}`)
                    .catch(error => { console.log('RegistrationPanel / Router:', error) })
            }
        })
        .catch(error => {
            console.error('RegistrationPanel / Login:', error);
        })
}

export default RegistrationPanel
