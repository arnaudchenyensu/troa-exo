import { useLayoutEffect, useRef } from 'react'
import beersBg from '../assets/beers-bg.svg'
import { gsap, Linear } from 'gsap'
import Beer from './Beer'

interface Props {
  beers: any[]
  onBeerClicked: (i: number) => void
}

export default function MainContent({ beers, onBeerClicked }: Props) {
  const rootRef = useRef(null)

  // beers bg animation
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
      const side = i % 2 === 0 ? 'even' : 'odd'

      return <Beer
        key={beer.name}
        beer={beer}
        onBeerClicked={() => onBeerClicked(i)}
        side={side} />
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