import React from 'react'
import { Button } from '@/components/ui/button'
interface Props{
    query:string,
    setQuery: (value:string) => void
}
const SearchBar: React.FC<Props> = ({query,setQuery}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value);
    }

  return (
    <div className='p-5 rounded-xl shadow-md bg-white 
                 flex items-center justify-between'>
        <input type="text"
    value={query}
    onChange={handleChange}
    placeholder='Search for a mood (e.g: happy)'
    className='w-full px-4 py-2 border rounded-md shadow-sm'/>

        <Button className='ml-2 p-5' variant="blue" onClick={() => setQuery("")}>
                Clear
        </Button>
    </div>
  )
}

export default SearchBar