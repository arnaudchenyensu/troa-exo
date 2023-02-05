import { useState } from 'react'
import logo from './assets/logo.svg'
import beerImage from './assets/beer.png'
import './App.scss'

const beers = [
  {
    name: "Arcade Nation",
    subtitle: "Seasonal Black IPA."
  },
  {
    name: "Movember",
    subtitle: "Moustache-worthy beer."
  },
  {
    name: "Alpha Dog",
    subtitle: "Existential Red Ale."
  },
  {
    name: "Mixtape 8",
    subtitle: "An Epic Fusion Of Old Belgian, American New Wave, And Scotch Whisky."
  },
  {
    name: "Libertine Porter",
    subtitle: "Agressive Porter"
  },
  {
    name: "AB:06",
    subtitle: "Imperial Black IPA."
  },
  {
    name: "RUSSIAN DOLL - INDIA PALE ALE",
    subtitle: "NESTING HOP BOMB."
  },
  {
    name: "HELLO MY NAME IS METTE-MARIT",
    subtitle: "Lingonberry double ipa."
  },
]

const renderBeers = () => {
  return beers.map((beer, i) => {
    const n = i % 2 === 0 ? 'even' : 'odd'

    if (n === 'even') {
      return (
        <div key={ beer.name } className={`beer ${n}`}>
          <div className='beer-info'>
            <h1 className='beer-name'>{ beer.name }</h1>
            <h4 className='beer-subtitle'>{ beer.subtitle }</h4>
            <button className='see-more'>See more <span>+</span></button>
          </div>
          <img src={beerImage} className='beer-img' alt={`${beer.name} image`} />
        </div>
      )
    } else {
      return (
        <div key={ beer.name } className={`beer ${n}`}>
          <img src={beerImage} className='beer-img' alt={`${beer.name} image`} />
          <div className='beer-info'>
            <h1 className='beer-name'>{ beer.name }</h1>
            <h4 className='beer-subtitle'>{ beer.subtitle }</h4>
            <button className='see-more'>See more <span>+</span></button>
          </div>
        </div>
      )
    }
  })
}

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="logo" alt="logo" />
        <span className="beer-emoji">🍺</span>
      </header>

      <div className="content">
        { renderBeers() }
      </div>

      <footer>
        <span className="">CHEERS</span>
        <span className="">PUNK API V2</span>
      </footer>
    </div>
  )
}

export default App
