import { useEffect, useState } from 'react'
import { getAllStartships } from './services/sw-api'
import './App.css'

function App() {
  const [starships, setStartships] = useState([])


  useEffect(() => {
    getAllStartships().then(setStartships)
  }, [])



  const renderStarships = starships?.map(starship => <Card name={starship.name} />)

  return (
    <main className='container-fluid' >
      <nav>Star Wars Starships</nav>
      <div className='row justify-content-center gap-4 mt-5'>
        {renderStarships}
      </div>
    </main>

  )
}

export default App



function Card({ name }) {
  return (<div className='col'>
    <div className='card text-center'>
      <div className='card-body'>
        {name}
      </div>

    </div>
  </div>)
}