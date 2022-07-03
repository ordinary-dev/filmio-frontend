import { Stack } from "@mui/material"
import type { NextPage } from 'next'
import Head from 'next/head'
import AuthorizationPanel from "../components/authorization-panel"

const LoginPage: NextPage = () => (
    <Stack alignItems='center'>
        <Head>
            <title>Login | Film.io</title>
        </Head>
        <AuthorizationPanel />
    </Stack>
)

export default LoginPage