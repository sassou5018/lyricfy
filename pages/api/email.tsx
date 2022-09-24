import connectDb from "../../utils/connectDb";
import emailModel from "../../utils/emailDocument";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    const email = req.body.email;
    if (!email) {
        res.status(400).json({ error: 'Bad request' });
        return;
    }
    try {
        await connectDb();
        const result = await emailModel.create({ email: email });
        res.status(200).json({ success: 'Email added to the list' });
    } catch(error){
        //@ts-ignore
        console.log('error', error.code)
        //@ts-ignore
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        }
        //@ts-ignore
        res.status(500).json({ error: error.message });
    }
    
}