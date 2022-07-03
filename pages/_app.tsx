import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "@fontsource/the-nautigal";
import type { AppProps } from 'next/app';
import '../styles/globals.scss';


function FilmIO({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}

export default FilmIO
