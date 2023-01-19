import '../styles/globals.css'
import Footer from '../components/Footer'
import {SessionProvider} from 'next-auth/react'
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  return <SessionProvider session={pageProps.session}>
    <Component {...pageProps}/>
    {router.pathname !== "/" ? <Footer /> : <></>}
  </SessionProvider> 
}

export default MyApp
