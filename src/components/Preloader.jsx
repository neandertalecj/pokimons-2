import Spinner from './Spinner'

const Preloader = ({ color, className, screenHeight }) => {
  return (
    <div className={`${screenHeight} flex justify-center items-center space-x-3 md:space-x-6 flex-wrap`}>
       {/* <Spinner color="#1d4ed8" className="h-20" /> */}
       <Spinner color={color} className={className} />

    </div>
  )
}

export default Preloader