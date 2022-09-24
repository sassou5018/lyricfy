import { getAccessToken, getUserInfo, getCurrentTrack } from "../../utils/spotifyApi";
import { decode } from 'js-base64';
export default async function refresh (req:any, res:any){
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
        return res.status(200).json({userInfo: userInfo, currentTrack: currentTrack});
    }
}