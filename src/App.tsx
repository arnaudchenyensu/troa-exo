import { useState } from 'react'
import logo from './assets/logo.svg'
import closeBtn from './assets/close-btn.svg'
import { beers } from './Data'
import MainContent from './components/MainContent'
import './App.scss'
import BeerModal from './components/BeerModal'

function App() {
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [beer, setBeer] = useState<any>(null)

  const closeModalBtn = () => {
    if (showModal) {
      return (
        <button
          className='close-btn'
          onClick={() => setIsModalClosing(true)}>
          <img src={closeBtn} alt="close button" />
        </button>
      )
    }
  }

  const modalOpen = showModal || isModalClosing ? 'modal-open' : ''

  return (
    <div className="App">
      <header>
        <img src={logo} className="logo" alt="logo" />
        { closeModalBtn() }
        <span className="beer-emoji">🍺</span>
      </header>

      <div className={`content ${modalOpen}`}>
        <MainContent
          beers={beers}
          isModalClosing={isModalClosing}
          onBeerClicked={(beer) => {
            setShowModal(true)
            setBeer(beer)
          }} />

        { showModal
          ? <BeerModal
              beer={beer}
              closing={isModalClosing}
              onClosingDone={() => {
                setIsModalClosing(false)
                setShowModal(false)
              }} />
          : <></>
        }
      </div>

      <footer>
        <span className="cheers">CHEERS</span>
        <span className="api">PUNK API V2</span>
      </footer>
    </div>
  )
}

export default App
