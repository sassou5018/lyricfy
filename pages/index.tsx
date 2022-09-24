import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Box, Button, Icon, Image, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { RiSpotifyLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  function handleClick(){
    router.push('/login');
  }
  async function handleSubmit(e: any){
    e.preventDefault();
    const endpoint = '/api/email';
    const data = {
      email: e.target.email.value
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    }
    const result = await fetch(endpoint, options);
    const json = await result.json();
    if(json.success){
      toast({
        title: "Email added to the list",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
    if (json.error){
      toast({
        title: json.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
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
          <VStack spacing="10px" color='white'>
          <Link href="/login">
            <Button colorScheme="green" leftIcon={<Icon as={RiSpotifyLine} size="xl" />} size="lg" shadow="base" onClick={handleClick}>Sign In With Spotify</Button>
          </Link>
          <Text fontSize='xs' textAlign='center'>PS: So uhh Spotify&aposs API only allows 25 predetermined users to use Apps and don&apost allow hobby/education projects to have unlimited acess </Text>
          <Text fontSize='xs' textAlign='center'>So if you want to test the app, drop ur email here and I&apoll add you to the list or hmu on <Link href="mailto:yassinebenahmede@gmail.com" passHref><a>yassinebenahmede@gmail.com</a></Link></Text>
          <form onSubmit={handleSubmit}>
          <Input type='email' placeholder="your@email.i'llGiveYouAcess" isRequired name="email" bgColor='gray.600' w="250px" shadow="base" _placeholder={{color: 'white'}}></Input>
          {/* Kinda too lazy to setup and SMTP mailer so yes i'm literally saving yalls emails in a database since it's easier and free anyway */}
          </form>
          </VStack>
        </main>
      </Box>

    </>
  )
}

export default Home
