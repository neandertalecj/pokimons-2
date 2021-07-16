import { memo, useState } from 'react'
import useFetch from '../Hooks/useFetch'
import Preloader from '../components/Preloader'
import PokemonItem from './PokemonItem'
import InfoBlock from './InfoBlock'
import FilterTypes from './FilterTypes'

const initialInfo = {
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
}


const PokemonList = () => {
  const { data, loading, error, fetchNow } = useFetch(`https://pokeapi.co/api/v2/pokemon?limit=12`)
  const [infoPok, setInfoPok] = useState(initialInfo)

  const handleLoadMore = () => fetchNow(data.next)

  const handleImageClick = info => setInfoPok(info)

  const handleCloseInfo = () => setInfoPok(initialInfo)

  if(loading) return <Preloader color="#1d4ed8" className="h-20" screenHeight={"h-screen"} />

  if(error) {
    console.log('error', error)
    return null
  }

  return (
    <div>
      <div className="container mx-auto flex relative">
        <div className="w-full lg:w-3/5">
          <ul className="flex flex-col sm:flex-row flex-wrap">
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

        <div className="lg:w-2/5">
          <div className="fixed left-0 lg:left-2/3 right-0 top-0 lg:top-32 bg-white">{/*left-0 lg:static */}
            {infoPok.url && <InfoBlock info={infoPok} onClose={handleCloseInfo} />}
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-20">
        <div>
          <FilterTypes />
        </div>
      </div>
    </div>
  )
}

export default memo(PokemonList)