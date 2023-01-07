async function SearchSong(title: string, artist: string) {
    // const url = `https://genius-song-lyrics1.p.rapidapi.com/search?q=${title.replace(
    //     /\s+/g,
    //     '%20'
    // )}%20${artist.replace(/\s+/g, '%20')}&per_page=3&page=1`
    const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${title.replace(
        ' ',
        '%20'
    )}%20${artist.replace(' ', '%20')}&per_page=10&page=1`
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
        },
    }
    //@ts-ignore
    const result = await fetch(url, options)
    const data = await result.json()
    if (result.status == 200) {
        console.log('lyrics Data Search: ', data.hits[0].result)
        return data
    } else {
        console.log('Lyrics Search error:', data)
        console.log('status Code:', result.status)
        return { error: 'No song found' }
    }
}

export default async function GetLyrics(title: string, artist: string) {
    const id = await SearchSong(title, artist)
    if (id.error) {
        return id
    }
    //const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics?id=${id.hits[0].result.id}`
    const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${id.hits[0].result.id}&text_format=plain`
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
        },
    }
    //@ts-ignore
    const result = await fetch(url, options)
    const data = await result.json()
    if (result.status == 200) {
        console.log('lyrics Data:', data.lyrics.lyrics)
        return {
            lyrics: data.lyrics,
            metadata: id.hits[0].result,
        }
    } else {
        console.log('Lyrics error:', data)
        return {
            error: 'No lyrics found',
        }
    }
}
