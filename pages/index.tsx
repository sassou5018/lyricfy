import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Box, Button, Icon, Image } from '@chakra-ui/react';
import { RiSpotifyLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  function handleClick(){
    router.push('/login');
  }
  return (
    <>
      <Head>
        <title>Lircfy By Yassine Ben Ahmed</title>
      </Head>

      <nav>
        <Box width="100vw" height="10vh" padding="10px" backgroundColor="gray.500">
          <Link href="/" passHref>
          <Image src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="App Logo" height="5vh" cursor="pointer" />
          </Link>
        </Box>
      </nav>
      <Box height="90vh" width="100vw" display="flex" flexDirection="column" justifyContent="center" alignItems="center" backgroundColor="gray.500" >
        <main>
          <Link href="/login">
            <Button colorScheme="green" leftIcon={<Icon as={RiSpotifyLine} size="xl" />} size="lg" shadow="base" onClick={handleClick}>Sign In With Spotify</Button>
          </Link>
        </main>
      </Box>

    </>
  )
}

export default Home
