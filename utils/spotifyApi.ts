import { encode, decode } from 'js-base64';
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

export { getAccessToken, getUserInfo, getCurrentTrack };