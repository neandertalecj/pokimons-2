const tabNames = {
  attack: 'Attack',
  defense: 'Defense',
  hp: 'HP',
  spAttack: 'SP Attack',
  spDefense: 'SP Defense',
  speed: 'Speed',
  weight: 'Weight',
  totalMoves: 'Tottal moves',
}

const InfoBlock = ({info, onClose}) => {
  const { name, id, type, tab } = info[0]
  console.log('POKEMON_INFO', info )
  // Adds zeros before the digit - in our case it an id of pokemon. There should be a total of three digits
  const pad = (str, max) => {
    console.log('STR', str, max)
    str = str.toString()
    return str.length < max ? pad("0" + str, max) : str
  }

  // Forms a types string from an array of objects
  const strTypes = arrTypes => {
    return arrTypes.reduce((acc, el) => {
      return `${acc}, ${el}`.replace(/^, /, '')
    }, '')
  }

  return (
    <div className="h-screen bg-gray-400 lg:bg-transparent">
      <div className="text-center border border-black p-5 lg:max-w-xs relative bg-white">
        <div
          className="cursor-pointer visible lg:invisible absolute right-5 bg-gray-300 py-1 px-3 rounded-full hover:bg-gray-400"
          onClick={onClose}
        >x</div>
        <div className="max-w-xs mx-auto">
          <img
            className="inline-block"
            src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
            alt={name}
          />
        </div>
        

        <div className="text-center font-medium text-1xl capitalize py-2">
          {name} #{pad(id, 3)}
        </div>

        <div className="max-w-xs m-auto">
        <table className="table-fixed border-collapse border border-black w-full">
          <tbody>
            <tr>
              <td className="w-3/4 border border-black">Type</td>
              <td className="w-1/4 border border-black">
                {type && strTypes(type)}
              </td>
            </tr>
            {tab && Object.entries(tab).map(el => (
              <tr key={el[0]}>
                <td className="border border-black">{tabNames[el[0]]}</td>
                <td className="border border-black">{el[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      </div>
    </div>
  )
}

export default InfoBlock