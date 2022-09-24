import { Box, Image, Heading, Text, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { RiSpotifyLine } from 'react-icons/ri';
export default function Profile({ userInfo }: any) {
    return (

        <Box border="2px" borderRadius='20px' padding="15px" borderColor="green">
            <Box display="flex" alignItems="center">
                <Image src={userInfo.images.length != 0 ? userInfo.images[0].url : "https://secure.gravatar.com/avatar/2a1d845bb47a98dd4759592fedb5bb33?s=96&r=g&d=https://similarpng.com/wp-content/plugins/userswp/assets/images/no_profile.png"} alt="User Profile Picture" height="200px" width="200px" borderRadius="full" maxW="120px" maxH="120px" />
                <Text color='green' marginLeft="10px">Spotify User<Icon as={RiSpotifyLine} marginLeft="5px" /></Text>
            </Box>
            <Link href={userInfo.external_urls.spotify || null} passHref>
                <Heading cursor="pointer">{userInfo.display_name || null}</Heading>
            </Link>
            <Text>{userInfo.email || null}</Text>
            <Text>{userInfo.country || null}</Text>
            <Text>{userInfo.product || null}</Text>
        </Box>
    )
}