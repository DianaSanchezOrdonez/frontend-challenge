import reactImage from '../assets/react.png'
import angularImage from '../assets/angular.png'
import vueImage from '../assets/vue.png'

const TechnologyFilter = (props: { onTechnologyChange: any }) => {
  const handleTechologyFilter = () => {
    props.onTechnologyChange()
  }

  return (
    <div className='selector' onClick={handleTechologyFilter}>
      <div>
        <p className='select-text'>Select your news</p>
        <i className='fa fa-chevron-down' id='arrow-icon'></i>
      </div>

      <ul className='list hide'>
        <li className='options'>
          <img src={angularImage} alt='angular' />
          <p>Angular</p>
        </li>
        <li className='options'>
          <img src={reactImage} alt='reactjs' />
          <p>Reactjs</p>
        </li>
        <li className='options'>
          <img src={vueImage} alt='reactjs' />
          <p>Vuejs</p>
        </li>
      </ul>
    </div>
  )
}

export default TechnologyFilter
