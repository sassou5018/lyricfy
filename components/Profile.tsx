import { Box, Image, Heading, Text, Icon } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { RiSpotifyLine } from 'react-icons/ri';
export default function Profile({ userInfo }: any) {
    return (
        <>
        <Head>
            <title>{userInfo.display_name || "Error"}</title>
        </Head>
        <Box border="1px" borderRadius='20px' padding="15px" borderColor="green" color="white" bgColor="gray.900">
            <Box display="flex" alignItems="center">
                <Image src={userInfo.images.length != 0 ? userInfo.images[0].url : "https://secure.gravatar.com/avatar/2a1d845bb47a98dd4759592fedb5bb33?s=96&r=g&d=https://similarpng.com/wp-content/plugins/userswp/assets/images/no_profile.png"} alt="User Profile Picture" borderRadius="full" width="60px" height="60px" maxW="120px" maxH="120px" />
                <Text color='green' marginLeft="10px" size="sm">Spotify User<Icon as={RiSpotifyLine} marginLeft="5px" /></Text>
            </Box>
            <Link href={userInfo.external_urls.spotify || null} passHref>
                <Heading cursor="pointer" size="sm">{userInfo.display_name || null}</Heading>
            </Link>
            <Text size="sm">{userInfo.email || null}</Text>
            <Text size="sm">{userInfo.country || null}</Text>
            <Text size="sm">{userInfo.product || null}</Text>
        </Box>
        </>
    )
}