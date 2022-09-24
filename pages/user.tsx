import { encode, decode } from 'js-base64'
import { Box, Image, Heading, Text, Icon, Button, Progress} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Profile from '../components/Profile';
import Track from '../components/Track';
import { useState, useEffect } from 'react';
import { getAccessToken, getUserInfo, getCurrentTrack } from '../utils/spotifyApi';
import getLyrics from '../utils/geniusApi';
export default function User({ userInfo, error, currentTrack, refresh, lyrics }: any) {
    const router = useRouter();
    const [userInfoState, setUserInfoState] = useState(userInfo);
    const [currentTrackState, setCurrentTrackState] = useState(currentTrack);
    
    
    console.log('lyrics', lyrics);


    async function handleRefresh() {
        const endpoint = '/api/refresh';
        const data = {
            refresh: refresh
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
        if(json){
            console.log('update', json);
            setUserInfoState(json.userInfo);
            setCurrentTrackState(json.currentTrack);
        }

    }
    if (error) {

        setTimeout(() => { router.push('/') }, 2000);
        return (<>
            <div>{error}. Redirecting...</div>
        </>)
    }
    if (userInfo) {
        //console.log('userInfo', userInfo);
        return (
            <>
            <Box height="100vh" width="100vw" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgColor="gray.500" >
                <Profile userInfo={userInfoState} />
                {currentTrack&&!currentTrack.error ? <Track currentTrack={currentTrackState}/> : null}
                <Button onClick={handleRefresh}>refresh</Button>
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
        const currentTrack = await getCurrentTrack(token.access_token, userInfo);
        if (currentTrack.error) {
            return {
                props: {
                    userInfo: JSON.parse(JSON.stringify(userInfo)),
                    currentTrack: "None",
                    refresh: JSON.parse(JSON.stringify(encode(token.access_token)))
                }
            }
        }
        const lyrics = await getLyrics(currentTrack.item.artists[0].name, currentTrack.item.name);
        if (lyrics.error){
            return {
                props: {
                    userInfo: JSON.parse(JSON.stringify(userInfo)),
                    currentTrack: JSON.parse(JSON.stringify(currentTrack)),
                    refresh: JSON.parse(JSON.stringify(encode(token.access_token)))
            }
        }
        }
        return {
            props: {
                userInfo: JSON.parse(JSON.stringify(userInfo)),
                currentTrack: JSON.parse(JSON.stringify(currentTrack)),
                refresh: token.access_token,
                lyrics: JSON.parse(JSON.stringify(lyrics))
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

