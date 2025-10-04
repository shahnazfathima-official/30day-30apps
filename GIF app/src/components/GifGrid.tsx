import React from 'react'
import { fetchGifs } from '@/lib/giphy'

interface Props{
    query:string
}

const GifGrid:React.FC<Props> = ({query}) => {

    const  [gifs, setGifs] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(()=>{
        const getGifs= async () =>{
            setLoading(true);

            try{
                const res= await fetchGifs(query);
                setGifs(res);
                // console.log(res);
            }catch(error){
                console.log("Error fetching GIFS", error);
            } finally{
                setLoading(false);
            }
        }
        getGifs();
       
    },[query]);

    if(loading) return <p>Loading GIFS...</p>


  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {
            gifs.map((gif) =>(
                <img key={gif.id} src={gif.images.fixed_height.url} 
                className='rounded shadow'/>
            ))
    }
    </div>
  )
}

export default GifGrid