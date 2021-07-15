import { useState } from 'react'
import useFetch from '../Hooks/useFetch'
import Preloader from '../components/Preloader'
import PokemonItem from './PokemonItem'
import InfoBlock from './InfoBlock'


const PokemonList = () => {
  const { data, loading, error, fetchNow } = useFetch(`https://pokeapi.co/api/v2/pokemon?limit=12`)
  const [infoPok, setInfoPok] = useState({
    url: '',
    name: '',
    id: '',
    type: [],
    tab: {
      attack: '',
      defense: '',
      hp: '',
      spAttack: '',
      spDefense: '',
      speed: '',
      weight: '',
      totalMoves: ''
    }
  })

  const handleLoadMore = () => {
    fetchNow(data.next)
  }

  const handleImageClick = (info) => {
    setInfoPok(info)
  }


  if(loading) return <Preloader color="#1d4ed8" className="h-20" screenHeight={"h-screen"} />

  if(error) {
    console.log('error', error)
    return null
  }

  return (
    <div className="container mx-auto pb-52 flex">
      <div className="w-3/5">
        <ul className="flex flex-wrap">
          {data && data.results.map(({ name, url }) => (
            <PokemonItem
              key={url}
              name={name}
              id={url.match(/\d+/g).slice(-1)}
              onImageClick={handleImageClick}
            />
          ))}
        </ul>
        <button
          className="w-full py-2 rounded bg-blue-400 text-white font-medium"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>

      <div className="w-2/5">
            {infoPok.url && <InfoBlock info={infoPok} />}
      </div>
      

    </div>
  )
}

export default PokemonList