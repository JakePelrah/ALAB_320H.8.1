import { useEffect, useState } from 'react'
import { getAllStartships } from './services/sw-api'
import './App.css'

function App() {
  const [starships, setStartships] = useState([])


  useEffect(() => {
    getAllStartships().then(setStartships)
    getAllStartships().then(console.log)
  }, [])


  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };

  }, [starships])


  const renderStarships = starships?.map(starship => <Card key={starship.name} starship={starship} />)

  return (
    <>
      <nav>Star Wars Starships</nav>
      <div className='container'>

        <div className='row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3 mt-5'>
          {renderStarships}
        </div>
      </div>
    </>

  )
}

export default App


function Card({ starship }) {
  return (
    <div className='col mb-5'>

      <div className='card'>
        <div className='card-header'>
          <h5 class="card-title">
            {starship.name}
          </h5>
        </div>
        <div className='card-img-div'>
        <img src={`/images/${starship.name}.webp`} className="card-img-top" />

        </div>

        <div className='card-body'>
          <div>Cost: {parseFloat(starship.cost_in_credits).toLocaleString()} </div>
          <div>Crew: {starship.crew} </div>
          <div>Passengers: {starship.passengers} </div>

        </div>

        <div className='card-footer'>
          <div className='fw-bold' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Manufacturer">{starship.manufacturer} </div>
        </div>
      </div>
    </div >)
}