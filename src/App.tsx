import { createRef, useLayoutEffect, useState } from 'react'
import logo from './assets/logo.svg'
import beersBg from './assets/beers-bg.svg'
import beerImage from './assets/beer.png'
import { gsap, Linear } from 'gsap'
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

function App() {
  const rootRef = createRef()
  const [beerIndex, setBeerIndex] = useState(-1)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".beers-bgs img",
        {
          y: "-100%"
        },
        {
          y: "0%",
          repeat: -1,
          duration: 10,
          ease: Linear.easeNone,
          delay: 0
        }
      )
    }, rootRef);

    return () => ctx.revert();
  }, [])

  const onEnter = ({ currentTarget }: any) => {
    gsap.to(currentTarget, { scale: 1.2 });
  };

  const onLeave = ({ currentTarget }: any) => {
    gsap.to(currentTarget, { scale: 1 });
  };

  const renderBeers = () => {
    return beers.map((beer, i) => {
      const n = i % 2 === 0 ? 'even' : 'odd'

      if (n === 'even') {
        return (
          <div key={ beer.name } className={`beer ${n}`}>
            <div className='beer-info'>
              <h1 className='beer-name'>{ beer.name }</h1>
              <h4 className='beer-subtitle'>{ beer.subtitle }</h4>
              <button
                className='see-more'
                onClick={() => setBeerIndex(i)}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}>
                See more <span>+</span>
              </button>
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
              <button
                className='see-more'
                onClick={() => setBeerIndex(i)}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}>
                See more <span>+</span>
              </button>
            </div>
          </div>
        )
      }
    })
  }

  const modal = () => {
    const beer = beers[beerIndex]

    if (beer) {
      return (
        <>
          <div className='beer-display'>
            <h1 className='display-title'>{ beer.name }</h1>
            <img src={beerImage} className='beer-img' alt={`${beer.name} image`} />
          </div>
          <div className='info'>
            <div className='beer-title'>{ beer.name }</div>
            <div className='beer-subtitle'>{ beer.subtitle }</div>
            <p>Running the knife-edge between an India Pale Ale and a Stout, this particular style is one we truly love. Black IPAs are a great showcase for the skill of our brew team, balancing so many complex and twisting flavours in the same moment. The citrus, mango and pine from the hops – three of our all-time favourites – play off against the roasty dryness from the malt bill at each and every turn.</p>
            <div>
              <div className='specifications'>
                <h3 className='specifications-title'>Specifications</h3>
                <div className='attr'>
                  <span className='attr-key'>First brewed</span>
                  <span className='attr-val'>12/2015</span>
                </div>
                <div className='attr'>
                  <span className='attr-key'>ABV</span>
                  <span className='attr-val'>5.3</span>
                </div>
                <div className='attr'>
                  <span className='attr-key'>IBU</span>
                  <span className='attr-val'>60</span>
                </div>
                <div className='attr'>
                  <span className='attr-key'>EBC / SRM</span>
                  <span className='attr-val'>200 / 100</span>
                </div>
              </div>
              <div className='ingredients'>
                <h3 className='ingredients-title'>Ingredients</h3>
                <div className='attr'>
                  <div className='attr-key'>Malt</div>
                  <div className='attr-val'>
                    <div>Pale Ale</div>
                    <div>Caramalt</div>
                    <div>Crystal 150</div>
                    <div>Carafa Special Malt Type 1</div>
                  </div>
                </div>
                <div className='attr'>
                  <div className='attr-key'>Yeast</div>
                  <div className='attr-val'>Wyeast 1056 - American Ale</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  const closeModalBtn = () => {
    if (beerIndex !== -1) {
      return (
        <button className='close-modal' onClick={() => setBeerIndex(-1) }>
          X
        </button>
      )
    }
  }

  return (
    <div className="App" ref={rootRef}>
      <header>
        <img src={logo} className="logo" alt="logo" />
        { closeModalBtn() }
        <span className="beer-emoji">🍺</span>
      </header>

      <div className="content">
        <div className="beers-bg-container">
          <div className="beers-bgs">
            <img src={beersBg}/>
            <img src={beersBg}/>
          </div>
        </div>
        { beerIndex !== -1
          ? <div className="modal">{ modal() }</div>
          : <div className="beers">{ renderBeers() }</div>
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
