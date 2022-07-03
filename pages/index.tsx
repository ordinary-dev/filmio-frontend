import Stack from '@mui/material/Stack'
import type { NextPage } from 'next'
import Head from 'next/head'
import Description from '../components/description'
import RandomPost from '../components/random-post'


const Home: NextPage = () => (
  <Stack alignItems='center' spacing='30px'>
    <Head>
      <title>Film.io</title>
    </Head>
    <Description />
    <RandomPost />
  </Stack>
)

export default Home
