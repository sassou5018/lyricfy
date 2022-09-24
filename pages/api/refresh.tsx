import { getAccessToken, getUserInfo, getCurrentTrack } from "../../utils/spotifyApi";
import GetLyrics from "../../utils/geniusApi";
import { decode } from 'js-base64';
import { NextApiRequest, NextApiResponse } from "next";
export default async function refresh (req:NextApiRequest, res:NextApiResponse){
    const token = {
        access_token: req.body.refresh
    }
    if (token.access_token) {
        const userInfo = await getUserInfo(token.access_token);
        if (userInfo.error) {
            return res.status(400).json({error: "Something went wrong"});
        }
        const currentTrack = await getCurrentTrack(token.access_token, userInfo);
        if (currentTrack.error) {
            return res.status(200).json({userInfo: userInfo, currentTrack: "None"});
        }
        const lyrics = await GetLyrics(currentTrack.item.artists[0].name, currentTrack.item.name);
        return res.status(200).json({userInfo: userInfo, currentTrack: currentTrack});
    }
}