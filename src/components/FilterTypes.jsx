import { useContext } from "react"
import { TypeContext } from '../App'
import Badge from './Badge'

const FilterTypes = (props) => {
  const { pageTypes } = useContext(TypeContext)

  return (
    <div className="pb-52">
      <h2 className="font-medium text-2xl">Avaible types on this page</h2>
      <div className="flex flex-wrap space-x-2">
        {pageTypes && pageTypes.map(name => (   
              <Badge className="w-32 my-2" key={name} name={name} />
            ))}
        </div>
    </div>
  )
}

export default FilterTypes