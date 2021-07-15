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

const InfoBlock = ({ info: { url, name, id, type, tab }}) => {
  
  const pad = (str, max) => {
    str = str.toString()
    return str.length < max ? pad("0" + str, max) : str
  }

  console.log('TYPE', tab,Object.entries(tab))

  return (
    <div className="text-center">
      <img src={url} alt={name} />
      <div className="text-center font-medium text-2xl capitalize">
        {name} #{pad(id, 3)}
      </div>

      <div className="">
      <table className="table-auto">
        <tbody>
          <tr>
            <td>Type</td>
            <td>
              {type && type.map(({ type: { name }}) => (
                <span key={name}>{name} </span>
              ))}
            </td>
          </tr>
          {tab && Object.entries(tab).map(el => (
            <tr key={el[0]}>
              <td>{tabNames[el[0]]}</td>
              <td>{el[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  )
}

export default InfoBlock