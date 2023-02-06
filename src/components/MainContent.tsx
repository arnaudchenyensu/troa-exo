import { useLayoutEffect, useRef } from 'react'
import beersBg from '../assets/beers-bg.svg'
import beerImage from '../assets/beer.png'
import { gsap, Linear } from 'gsap'

interface Props {
  beers: any[]
  onBeerClicked: (i: number) => void
}

export default function MainContent({ beers, onBeerClicked }: Props) {
  const rootRef = useRef(null)

  const onEnter = ({ currentTarget }: any) => {
    gsap.to(currentTarget, { scale: 1.2 });
  };

  const onLeave = ({ currentTarget }: any) => {
    gsap.to(currentTarget, { scale: 1 });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".beers-bg",
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
    }, rootRef)

    return () => ctx.revert()
  }, [])

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
                onClick={() => onBeerClicked(i)}
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
                onClick={() => onBeerClicked(i)}
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

  return (
    <>
      <div className="beers-bg-container">
        <div className="beers-bgs" ref={rootRef}>
          <img src={beersBg} className="beers-bg"/>
          <img src={beersBg} className="beers-bg"/>
        </div>
      </div>
      <div className="beers">{ renderBeers() }</div>
    </>
  )
}