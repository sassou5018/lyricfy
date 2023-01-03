import { NextApiRequest, NextApiResponse } from 'next'
import nodeMailer from 'nodemailer'

type EmailData = {
    from: string
    to: string
    subject: string
    text: string
}

const sendEmail = async (emailData: EmailData) => {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.user,
            pass: process.env.password,
        },
    })
    return (
        transporter
            //@ts-ignore
            .sendMail(emailData)
    )
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email } = req.body
    const emailData = {
        from: email,
        to: 'yassinebenahmede@gmail.com',
        subject: `Lyricfy Request from ${email}`,
        text: `A user with the email ${email} has requested to be added to the Lyricfy whitelist`,
    }
    try {
        await sendEmail(emailData)
        res.status(200).json({ success: 'Email Added To The List' })
    } catch (e) {
        res.status(400).json({ error: 'An error occured' })
    }
}
