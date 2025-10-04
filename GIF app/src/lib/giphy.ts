export const fetchGifs = async (query:string)=>{
    const apikey = import.meta.env.VITE_GIPHY_API_KEY;

    const url= `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apikey}&limit=12`;

    const res = await fetch(url);
    const data = await res.json();

    return data.data


}