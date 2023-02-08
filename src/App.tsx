import { useEffect, useState } from 'react'
import logo from './assets/logo.svg'
import { beers } from './Data'
import MainContent from './components/MainContent'
import './App.scss'
import BeerModal from './components/BeerModal'

function App() {
  const [beerIndex, setBeerIndex] = useState(-1)
  const [savedScrollPos, setSavedScrollPos] = useState(0)
  const [isModalClosing, setIsModalClosing] = useState(false)

  useEffect(() => {
    if (beerIndex === -1) {
      // when the modal is closed,
      // we set the scroll position back to where it was
      // before the modal was opened
      // TODO: use a ref to do ref.current.scrollTo
      document.documentElement.scrollTo({
        top: savedScrollPos,
        behavior: 'smooth',
      })
    } else {
      // when the modal is opened,
      // we scroll to the top
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [beerIndex, savedScrollPos])

  const closeModalBtn = () => {
    if (beerIndex !== -1) {
      return (
        <button
          className='close-modal'
          onClick={() => setIsModalClosing(true)}>
          X
        </button>
      )
    }
  }

  const modalOpen = beerIndex !== -1 ? 'modal-open' : ''

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
          onBeerClicked={(i) => {
            setBeerIndex(i)
            setSavedScrollPos(document.documentElement.scrollTop)
          }} />

        { beerIndex !== -1
          ? <BeerModal
            beer={beers[beerIndex]}
            closing={isModalClosing}
            onClosingDone={() => {
              setBeerIndex(-1)
              setIsModalClosing(false)
            }} />
          : <></>
        }
      </div>

      <footer>
        <span className="">CHEERS</span>
        <span className="">PUNK API V2</span>
      </footer>
    </div>
  )
}

export default App
