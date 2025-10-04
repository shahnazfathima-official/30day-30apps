import GifGrid from "@/components/GifGrid"
import SearchBar from "@/components/SearchBar"
import React from "react"

const Home = () => {

    const [query, setQuery]= React.useState("calm");

    console.log(query);

  return (
    <div className="w-full max-w-4xl mx-auto text-center space-y-6 p-5">
        <h1 className="text-6xl font-bold">Gif Quest</h1>
        <SearchBar query={query} setQuery={setQuery} />
        <GifGrid query={query} />
    </div>
  )
}

export default Home