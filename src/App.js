import { createContext, useState } from 'react';
import PokemonList from './components/PokemonList'

export const TypeContext = createContext([])

function App() {
  const [pageTypes, setPageTypes] = useState([])
  
// Here we are colletion all type from every PokemonItem component
  const colletctTypes = arrTypes => {
    const res = arrTypes.map(el => el.type.name)
    const summary = [...pageTypes, ...res]
    let unic = summary.filter((item, i, ar) => ar.indexOf(item) === i)
    setPageTypes(unic)
  }

  return (
    <TypeContext.Provider value={{ pageTypes, colletctTypes }}>
      <div>
        <div className="text-center py-5">
          <div className="capitalize text-center border border-black inline-block py-2 px-36 text-3xl font-medium">
            pokedex
          </div>
        </div>
        <PokemonList />
      </div>
    </TypeContext.Provider>
  )
}

export default App;
