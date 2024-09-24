import { useEffect, useState } from 'react'
import { getAllStartships } from './services/sw-api'
import './App.css'

function App() {
  const [starships, setStartships] = useState([])


  useEffect(() => {
    getAllStartships().then(setStartships)


  }, [])


  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };

  }, [starships])

  const renderStarships = starships?.map(starship => <Card starship={starship} />)

  return (
    <main className='container-fluid' >
      <nav>Star Wars Starships</nav>
      <div className='row gap-4 mt-5'>
        {renderStarships}
      </div>
    </main>

  )
}

export default App



function Card({ starship }) {
  return (<div className='col'>
    <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title={`capacity:${parseInt(starship.cargo_capacity).toExponential()} 
    cost: ${parseInt(starship.cost_in_credits).toExponential()}`} className='card text-center'>
      {starship.name}
    </div>
  </div>)
}