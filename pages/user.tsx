import { encode, decode } from 'js-base64';
import { Box, Image, Heading, Text, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { RiSpotifyLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
export default function User({ userInfo, error }: any) {
    const router = useRouter();
    if (error) {
        
        setTimeout(() => {router.push('/')}, 2000);
        return (<>
        <div>{error}. Redirecting...</div>
        </>)
    }
    if (userInfo) {
        console.log('userInfo', userInfo);
        return (
            <>
            <Box height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center" >
                <Box border="2px" borderRadius='20px' padding="15px" borderColor="green">
                    <Box display="flex" alignItems="center">
                        <Image src={userInfo.images.length!=0 ? userInfo.images[0].url : "https://secure.gravatar.com/avatar/2a1d845bb47a98dd4759592fedb5bb33?s=96&r=g&d=https://similarpng.com/wp-content/plugins/userswp/assets/images/no_profile.png"} alt="User Profile Picture" height="200px" width="200px" borderRadius="full" maxW="120px" maxH="120px" />
                        <Text color='green' marginLeft="10px">Spotify User<Icon as={RiSpotifyLine} marginLeft="5px"/></Text>
                    </Box>
                    <Link href={userInfo.external_urls.spotify|| null} passHref>
                    <Heading cursor="pointer">{userInfo.display_name || null}</Heading>
                    </Link>
                    <Text>{userInfo.email || null}</Text>
                    <Text>{userInfo.country || null}</Text>
                    <Text>{userInfo.product || null}</Text>
                </Box>
            </Box>
            </>
        )
    }
}

export async function getServerSideProps(context: any) {
    const req = context.query;
    const qState = req.state;
    const qCode = req.code;
    const client_id = process.env.CLIENT_ID;
    if (qState !== "5018") {
        return {
            error: "State is Wrong"
        }
    }
    const token = await getAccessToken(qCode);
    if (token.access_token) {
        const userInfo = await getUserInfo(token.access_token);
        if (userInfo.error) {
            return {
                props: {
                    error: "Something went wrong"
                }
            }
        }
        return {
            props: {
                userInfo: JSON.parse(JSON.stringify(userInfo))
            }
        }
    }

    console.log('token', token);

    //console.log('req', req);
    return {
        props: {
            error: "Something went wrong"
        }
    }
}

async function getAccessToken(code: string) {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    const url = `https://accounts.spotify.com/api/token`;
    const data = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
    }
    //@ts-ignore
    const params = new URLSearchParams(data);
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encode(`${client_id}:${client_secret}`)}`
    }
    const result = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: params
    });
    const json = await result.json();
    return json;
}

async function getUserInfo(token: string) {
    const url = `https://api.spotify.com/v1/me`;
    const headers = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const result = await fetch(url, {
        method: 'GET',
        headers: headers
    });
    const json = await result.json();
    return json;
}