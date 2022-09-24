import { getAccessToken, getUserInfo, getCurrentTrack } from "../../utils/spotifyApi";
import { decode } from 'js-base64';
export default async function refresh (req:any, res:any){
    const token = JSON.parse(decode(req.body.token));
    if (token.access_token) {
        const userInfo = await getUserInfo(token.access_token);
        if (userInfo.error) {
            return res.status(400).json({error: "Something went wrong"});
        }
        const currentTrack = await getCurrentTrack(token.access_token, userInfo);
        if (currentTrack.error) {
            return res.status(200).json({userInfo: JSON.parse(JSON.stringify(userInfo)), currentTrack: "None"});
        }
        return res.status(200).json({userInfo: JSON.parse(JSON.stringify(userInfo)), currentTrack: JSON.parse(JSON.stringify(currentTrack))});
    }
}