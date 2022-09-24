
export default function Login({ variables }:any) {
    return (
        <div>
        <h1>Login</h1>
        <p>Client ID: {variables}</p>
        </div>
    )
}

export async function getServerSideProps() {
    const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    return {
        redirect: {
            destination: `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=user-read-private%20user-read-email%20user-read-currently-playing&redirect_uri=${redirect_uri}&state=5018`,
        }
    }
}