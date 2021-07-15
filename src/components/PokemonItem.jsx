import { useEffect, useState } from "react"
import useFetch from '../Hooks/useFetch'
import Preloader from './Preloader'
import Badge from './Badge'

const PokemonItem = ({ name, id, onImageClick }) => {
  const [imgStatus, setImgStaus] = useState('loading')
  const { data } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const [info, setInfo] = useState({})

  useEffect(() => {
    data && setInfo({
      url: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
      name: name,
      id: id,
      type: data.types,
      tab: {
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        hp: data.stats[0].base_stat,
        spAttack: data.stats[3].base_stat,
        spDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        weight: data.weight,
        totalMoves: data.moves.length
      }
    })
  }, [data])

  const handleImageLoaded = () => {
    setImgStaus('loaded')
  }

  const handleImageErrored = () => {
    setImgStaus('failed to load')
  }

  data && console.log('Abilitis', data.moves.length)//data.types[0].type.name
                                             // data.stats

  // data.weight     Weight
  
  return (
    <li className="w-1/3 mb-8">
      <div className="border border-black px-5 pb-16 mx-4">
        <img
          className="my-4 cursor-pointer"
          src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          alt={id}
          onLoad={handleImageLoaded}
          onError={handleImageErrored}
          onClick={() => onImageClick(info)}
        />

        {imgStatus === 'failed to load' && imgStatus}
        {imgStatus === 'loading' && <Preloader color="#1d4ed8" className="h-10" screenHeight={""} />}

        <div className="capitalize font-medium text-center">
          {name}
        </div>
        <div className="flex space-x-2">
          {data && data.types.map(({ type: { name } }) => (   
            <Badge key={name} name={name} />
          ))}
        </div>
      </div>
    </li>
  )
}

export default PokemonItem