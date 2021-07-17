import { useState } from 'react'
import Preloader from '../components/Preloader'
import PokemonItem from './PokemonItem'
import InfoBlock from './InfoBlock'
import FilterTypes from './FilterTypes'

const PokemonList = ({ data, loading, error, onLoadMore, onFilter }) => {
  const [infoPok, setInfoPok] = useState(null)

  const handleImageClick = id => setInfoPok(id)

  const handleCloseInfo = () => setInfoPok(null)

  const getPokimonInfo = id =>  data.filter(pok => pok.id === id)

  const handleClicLoadMore = () => {
    handleCloseInfo()
    onLoadMore()
  }
  
// Getting unic Types on page
  const getTypesOnPage = () => {
    const arrTypes = data.reduce((acc, el) =>  [...acc, ...el.type], [])
    const unic = arrTypes.filter((item, i, ar) => ar.indexOf(item) === i)

    return unic
  }

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
            {data && data.map((pokData) => (
              <PokemonItem
                key={pokData.id}
                pokData={pokData}
                onImageClick={handleImageClick}
              />
            ))}
          </ul>
          <button
            className="w-full py-2 rounded bg-blue-400 text-white font-medium"
            onClick={handleClicLoadMore}
          >
            Load More
          </button>
        </div>

        <div className="lg:w-2/5">
          <div className="fixed left-0 lg:left-2/3 right-0 top-0 lg:top-32 bg-white">
            {infoPok && <InfoBlock info={getPokimonInfo(infoPok)} onClose={handleCloseInfo} />}
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-20">
        <div className="w-full lg:w-3/5">
          <FilterTypes
            typesOnPage={getTypesOnPage()}
            onFilter={onFilter}
          />
        </div>
      </div>
    </div>
  )
}

export default PokemonList