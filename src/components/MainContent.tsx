import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import beersBg from '../assets/beers-bg.svg'
import { gsap, Linear } from 'gsap'
import Beer from './Beer'
import { IBeer } from '../Data'

interface Props {
  beers: IBeer[]
  isModalClosing: boolean
  onBeerClicked: (beer: any) => void
}

export default function MainContent({
  beers,
  isModalClosing,
  onBeerClicked
}: Props) {
  const beersBgRef = useRef(null)
  const [beerIndex, setBeerIndex] = useState(-1)
  const [savedScrollPos, setSavedScrollPos] = useState(0)

  useEffect(() => {
    if (beerIndex === -1) {
      // when the modal is closed,
      // we set the scroll position back to where it was
      // before the modal was opened
      // TODO: use a ref to do ref.current.scrollTo
      document.documentElement.scrollTo({
        top: savedScrollPos,
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
    }, beersBgRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!isModalClosing) {
      setBeerIndex(-1)
    }
  }, [isModalClosing])

  const renderBeers = () => {
    return beers.map((beer, i) => {
      const side = i % 2 === 0 ? 'left' : 'right'
      const display = beerIndex !== -1 && beerIndex !== i ? 'hide' : ''

      return <Beer
        key={beer.name}
        beer={beer}
        className={display}
        isModalClosing={isModalClosing}
        onBeerClicked={() => {
          setBeerIndex(i)
          setSavedScrollPos(document.documentElement.scrollTop)
          onBeerClicked(beer)
        }}
        side={side} />
    })
  }

  return (
    <>
      <div className="beers-bg-container">
        <div className="beers-bgs" ref={beersBgRef}>
          <img src={beersBg} className="beers-bg"/>
          <img src={beersBg} className="beers-bg"/>
        </div>
      </div>
      <div className="beers">
        { renderBeers() }
      </div>
    </>
  )
}