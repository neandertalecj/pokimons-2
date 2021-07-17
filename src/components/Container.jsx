import { useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'
import PokemonList from './PokemonList'

const Container = () => {
  const { data, loading, error, fetchNow } = useFetch(`https://pokeapi.co/api/v2/pokemon?limit=12`)
  const [appData, setAppData] = useState([])
  const [appDataM, setAppDataM] = useState([])
  const [infoPok, setInfoPok] = useState(null)

  useEffect(() => {
    data && Promise.all(data.results.map(({url}) =>
      fetch(url)
        .then(checkStatus)  // check the response of our APIs
        .then(parseJSON)    // parse it to Json
        .catch(error => console.log('There was a problem!', error))
        ))
        .then(pokData => {
          data && setAppData(combineData(data, pokData))
        })
  }, [data])

  useEffect(() => {
    appData && setAppDataM(appData)
  }, [appData])

  const checkStatus = response => {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  const parseJSON = response => response.json()

  //Extraction of types from a complex structure
  const getTypes = objectPokemon => {
    const typesArrey = objectPokemon.types.map(({ type: { name }})=> {
      return name
    })
    return typesArrey
  }
  

// Preparing data for the app by combining results from multiple requests
  const combineData = (data, pokData) => {
    const pokCombined = data.results.map(pokN => {
      let idD = null
      const matched = pokData.filter((pokD) => {
        // extracting id from url
        idD = pokN.url.match(/\d+/g).slice(-1)[0]

        return +pokD.id === +idD
      })

      return {
        url: pokN.url,
        name: pokN.name,
        id: idD,
        type: getTypes(matched[0]), 
        tab: {
          attack: matched[0].stats[1].base_stat,
          defense: matched[0].stats[2].base_stat,
          hp: matched[0].stats[0].base_stat,
          spAttack: matched[0].stats[3].base_stat,
          spDefense: matched[0].stats[4].base_stat,
          speed: matched[0].stats[5].base_stat,
          weight: matched[0].weight,
          totalMoves: matched[0].moves.length
        }
      }
    })//map's end

    return pokCombined
  }

  const handleLoadMore = () => fetchNow(data.next)

  const handleCloseInfo = () => setInfoPok(null)

  // Sorting appData (page data) by type
  const handleSort = targetType => {
    const sorted = appDataM.sort((a, b) => {
      let mark = -1
      a.type.includes(targetType) ? mark = -1 : mark = 1
      return mark
    })

    setAppDataM([...sorted])
  }

  // Filtering appData (page data) by type
  const handleFilter = targetType => {
    handleCloseInfo()
    if (targetType === 'all') {
      setAppDataM(appData)
    } else {
      const filtered = appDataM.filter(el => el.type.includes(targetType))

      setAppDataM([...filtered])
    }
  }

            console.log("DATA-M", appDataM)
          console.log("DATA", appData)
  
  return (
    <div>
      <PokemonList
        data={appDataM}
        loading={loading}
        error={error}
        onLoadMore={handleLoadMore}
        onSort={handleSort}
        onFilter={handleFilter}
        infoPok={infoPok}
        setInfoPok={setInfoPok}
        handleCloseInfo={handleCloseInfo}
      />
    </div>
  )
}

export default Container