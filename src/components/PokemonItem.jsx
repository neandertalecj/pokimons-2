import { useState } from "react"
import Preloader from './Preloader'
import Badge from './Badge'

const PokemonItem = ({ pokData, onImageClick }) => {
  const [imgStatus, setImgStaus] = useState('loading')

  const { name, id, type } = pokData

  const handleImageLoaded = () => {
    setImgStaus('loaded')
  }

  const handleImageErrored = () => {
    setImgStaus('failed to load')
  }
 
  return (
    <li className="sm:w-1/2 md:w-1/3 mb-8">
      <div className="border border-black px-5 pb-16 mx-4">
        <img
          className="my-4 cursor-pointer"
          src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          alt={name}
          onLoad={handleImageLoaded}
          onError={handleImageErrored}
          onClick={() => onImageClick(id)}
        />

        {imgStatus === 'failed to load' && imgStatus}
        {imgStatus === 'loading' && <Preloader color="#1d4ed8" className="h-10" screenHeight={""} />}

        <div className="capitalize font-medium text-center">
          {name}
        </div>
        <div className="flex space-x-2">
          {pokData && type.map(name => (   
            <Badge key={name} name={name} className="w-1/2" />
          ))}
        </div>
      </div>
    </li>
  )
}

export default PokemonItem