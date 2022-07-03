import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Cookies from 'js-cookie'
import router from 'next/router'
import { FormEvent } from 'react'
import getToken, { TokenResponse } from '../../helpers/get-token'

/** Interface with username and password */
export interface LoginForm extends HTMLFormElement {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

/** Form with username and password.
 * It makes a request to the server,
 * receives a token and opens the user profile */
const LoginPanel: React.FC = () => (
    <form onSubmit={handleFormSubmit}>
        <Stack spacing={'15px'}>
            <TextField required name='username' label="Username" />
            <TextField required name='password' label='Password' type='password' variant="outlined" />
            <Button type='submit' variant="contained">Login</Button>
        </Stack>
    </form>
)

const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as LoginForm
    getToken(target.username.value, target.password.value)
        .then((result: TokenResponse) => {
            if (result.access_token) {
                Cookies.set('access_token', result.access_token, { expires: 365 })
                router.push(`/${target.username.value}`)
                    .catch(error => { console.log('LoginPanel / Router:', error) })
            }
        })
        .catch(error => {
            console.error('LoginPanel / HandleFormSubmit:', error);
        })
}

export default LoginPanel