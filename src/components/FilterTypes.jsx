import Badge from './Badge'

const FilterTypes = ({ typesOnPage, onFilter }) => {

  return (
    <div className="pb-52">
      <h2 className="font-medium text-2xl">
        Sorting page elements by a choosen type
      </h2>
      <div className="flex flex-wrap space-x-2">
        {typesOnPage && typesOnPage.map(name => (   
          <Badge
            className="w-32 my-2 cursor-pointer"
            key={name} 
            name={name}
            onFilter={() => onFilter(name)}
          />
        ))}
      </div>
    </div>
  )
}

export default FilterTypes