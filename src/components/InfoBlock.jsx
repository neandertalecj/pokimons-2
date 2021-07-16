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
  const { url, name, id, type, tab } = info
  // console.log('REST',rest)
  
  // Adds zeros before the digit - in our case it an id of pokemon. There should be a total of three digits
  const pad = (str, max) => {
    str = str.toString()
    return str.length < max ? pad("0" + str, max) : str
  }

  // Forms a types string from an array of objects
  const strTypes = arrTypes => {
    return arrTypes.reduce((acc, el) => {
      return `${acc}, ${el.type.name}`.replace(/^, /, '')
    }, '')
  }

  return (
    <div className="text-center border border-black p-5 relative">
      <div
        className="visible lg:invisible absolute right-5 bg-gray-300 py-1 px-3 rounded-full hover:bg-gray-400"
        onClick={onClose}
      >x</div>

      <img className="inline-block" src={url} alt={name} />

      <div className="text-center font-medium text-2xl capitalize py-8">
        {name} #{pad(id, 3)}
      </div>

      <div className="">
      <table className="table-fixed border-collapse border border-black w-full">
        <tbody>
          <tr>
            <td className="w-3/4 border border-black py-2">Type</td>
            <td className="w-1/4 border border-black py-2">
              {type && strTypes(type)}
            </td>
          </tr>
          {tab && Object.entries(tab).map(el => (
            <tr key={el[0]}>
              <td className="border border-black py-2">{tabNames[el[0]]}</td>
              <td className="border border-black py-2">{el[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  )
}

export default InfoBlock