import { useEffect, useRef, useState } from 'react'
import { getAllStartships } from './services/sw-api'
import './App.css'

function App() {
  const [starships, setStartships] = useState([])
  const modalRef = useRef(null)


  useEffect(() => {
    getAllStartships().then(setStartships)
    modalRef.current = new bootstrap.Modal('#lightbox')
  }, [])


  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };

  }, [starships])

  function openLighbox(name) {

    const modalImage = modalRef.current._element.querySelector('#modal-image')
    modalImage.src = `/images/${name}.webp`
    modalRef.current.show()

  }

  const renderStarships = starships?.map(starship => <Card key={starship.name} starship={starship} openLighbox={openLighbox} />)

  return (
    <>
      <nav>Star Wars Starships</nav>
      <div className='container'>

        <div className='row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3 mt-5'>
          {renderStarships}
        </div>
      </div>


      <div id="lightbox" className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-body">
              <img id="modal-image" src="" />
            </div>

          </div>
        </div>
      </div>
    </>

  )
}

export default App


function Card({ starship, openLighbox }) {


  return (
    <div onClick={() => openLighbox(starship.name)} className='col mb-5'>

      <div className='card'>
        <div className='card-header'>
          <h5 className="card-title">
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