import Badge from './Badge'

const FilterTypes = ({ typesOnPage, onFilter, onSort }) => {

  return (
    <div className="pb-52">
      <h2 className="font-medium text-2xl">
        Filter
      </h2>
      <div className="flex flex-wrap space-x-2">
        <Badge
          className="w-32 my-2 cursor-pointer"
          key='all' 
          name='All'
          onHadler={() => onFilter('all')}
        />
        {typesOnPage && typesOnPage.map(name => (   
          <Badge
            className="w-32 my-2 cursor-pointer"
            key={name} 
            name={name}
            onHadler={() => onFilter(name)}
          />
        ))}
      </div>
      <h2 className="font-medium text-2xl">
        Sorting page elements by a choosen type
      </h2>
      <div className="flex flex-wrap space-x-2">
        {typesOnPage && typesOnPage.map(name => (   
          <Badge
            className="w-32 my-2 cursor-pointer"
            key={name} 
            name={name}
            onHadler={() => onSort(name)}
          />
        ))}
      </div>
    </div>
  )
}

export default FilterTypes