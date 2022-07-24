import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "@fontsource/the-nautigal";
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { SWRConfig } from 'swr'

const FilmIO = ({ Component, pageProps }: AppProps) => (
    <SWRConfig value={{
        refreshInterval: 15000,
        fetcher: (resource: RequestInfo, init: RequestInit) => fetch(resource, init).then(res => res.json())
    }}>
        <Component {...pageProps} />
    </SWRConfig>
)

export default FilmIO
