import { useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'


const Container = () => {
  const [urls, setUrls] = useState([])
  const { data, loading, error, fetchNow } = useFetch(`https://pokeapi.co/api/v2/pokemon?limit=12`)
  const [appData, setAppData] = useState([])

  // data && console.log(data.results)

  useEffect(() => {
    data && Promise.all(data.results.map(({url}) =>
      fetch(url)
        .then(checkStatus)  // check the response of our APIs
        .then(parseJSON)    // parse it to Json
        .catch(error => console.log('There was a problem!', error))
        ))
        .then(pokData => {
          // data && console.log('COMBINE',combineData(data, pokData))
          data && setAppData(combineData(data, pokData))

        })
  }, [data])

  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  function parseJSON(response) {
    return response.json();
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
        type: matched[0]['types'],
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

  console.log('DATA',appData)
  
  return (
    <div>
      Container
    </div>
  )
}

export default Container