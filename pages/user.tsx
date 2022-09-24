import { encode, decode } from 'js-base64';
import { Box, Image, Heading, Text, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { RiSpotifyLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import Profile from '../components/Profile';
import Track from '../components/Track';
export default function User({ userInfo, error, currentTrack }: any) {
    const router = useRouter();
    console.log('currentTrack', currentTrack);
    if (error) {

        setTimeout(() => { router.push('/') }, 2000);
        return (<>
            <div>{error}. Redirecting...</div>
        </>)
    }
    if (userInfo) {
        console.log('userInfo', userInfo);
        return (
            <Box height="100vh" width="100vw" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgColor="gray.500" >
                <Profile userInfo={userInfo} />
                {currentTrack&&!currentTrack.error ? <Track currentTrack={currentTrack} /> : null}
            </Box>
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
        const currentTrack = await getCurrentTrack(token.access_token, userInfo);
        if (currentTrack.error) {
            return {
                props: {
                    userInfo: JSON.parse(JSON.stringify(userInfo)),
                    currentTrack: "None"
                }
            }
        }
        return {
            props: {
                userInfo: JSON.parse(JSON.stringify(userInfo)),
                currentTrack: JSON.parse(JSON.stringify(currentTrack))
            }
        }
    }

    //console.log('token', token);

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

async function getCurrentTrack(token: string, userInfo: any) {
    const url = `https://api.spotify.com/v1/me/player/currently-playing`;
    const headers = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const body = {
        market: userInfo.country
    }
    const result = await fetch(url, {
        method: 'GET',
        headers: headers
    });
    console.log('result', result);
    if (result.status == 204) {
        return { error: 'error' }
    }
    const json = await result.json();
    console.log('json', json);
    return json;
}