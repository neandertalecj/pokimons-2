const Badge = ({ name, className }) => {
  const bgCollor = {
    grass: 'from-green-300 to-green-100 border-green-500',
    poison: 'from-purple-400 to-purple-100 border-purple-500',
    fire: 'from-red-400 to-red-100 border-red-500',
    flying: 'from-blue-400 to-blue-100 border-blue-500',
    water: 'from-blue-500 to-blue-300 border-blue-700',
    bug : 'from-gray-400 to-gray-100 border-gray-500',
    electric: 'from-yellow-400 to-yellow-100 border-yellow-500',
    ground: 'from-yellow-600 to-yellow-300 border-yellow-700',
    fairy: 'from-red-200 to-red-50 border-red-400',
  }
  return (
    <div className={`border-2 bg-gradient-to-t ${bgCollor[name]} rounded ${className} text-center`}>
      {name}
    </div>
  )
}

export default Badge