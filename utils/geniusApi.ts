async function SearchSong(title:string, artist:string){
    const url= `https://genius-song-lyrics1.p.rapidapi.com/search?q=${title}%20${artist}&per_page=3&page=1`
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key':  process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    }
    //@ts-ignore
    const result = await fetch(url, options);
    const data = await result.json();
    if(data.meta.status == 200){
    return data;
    }
    else{
        return {error: "No song found"}
    }
}


export default async function GetLyrics(title:string, artist:string){
    const id = await SearchSong(title, artist);
    if(id.error){
        return id;
    }
    const url = `https://genius-song-lyrics1.p.rapidapi.com/songs/${id.response.hits[0].result.id}/lyrics`
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key':  process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    }
    //@ts-ignore
    const result = await fetch(url, options);
    const data = await result.json();
    if(data.meta.status == 200){
        return {
            lyrics: data.response.lyrics,
            metadata: id.response.hits[0].result
        }
    } else return {error: "No lyrics found"}
}



