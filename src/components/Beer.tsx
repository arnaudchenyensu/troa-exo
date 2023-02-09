import beerImage from '../assets/beer.png'
import { gsap } from 'gsap'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Props {
  beer: any
  className: string
  isModalClosing: boolean
  onBeerClicked: () => void
  side: string
}

export default function Beer({
  beer,
  className,
  isModalClosing,
  onBeerClicked,
  side,
}: Props) {
  const rootRef = useRef()
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true })

      if (side === 'left') {
        // animation for left side beer
        // animate beer's name
        timeline.to(".beer-name", {
          scale: 2,
          color: "rgba(255, 207, 0, 1)",
          x: "50%",
          zIndex: 1,
          position: "relative",
          textAlign: "center",
          // y: "-100%",
        })

        // hide see more and subtitle
        timeline.to(".see-more", { opacity: 0 }, "<")
        timeline.to(".beer-info .beer-subtitle", { opacity: 0, }, "<")

        // move beer img
        timeline.to(".beer-img", {
          x: "-50%",
          zIndex: 2,
          onStart: () => rootRef.current.scrollIntoView({ behavior: 'smooth' })
        }, "<")
      } else {
        // animation for right side beer
        // animate beer's name
        timeline.to(".beer-name", {
          scale: 2,
          color: "rgba(255, 207, 0, 1)",
          x: "-50%",
          zIndex: 1,
          position: "relative",
          textAlign: "center",
          // y: "-100%",
        })

        // hide see more and subtitle
        timeline.to(".see-more", { opacity: 0 }, "<")
        timeline.to(".beer-info .beer-subtitle", { opacity: 0, }, "<")

        // move beer img
        timeline.to(".beer-img", {
          x: "50%",
          zIndex: 2,
          onStart: () => rootRef.current.scrollIntoView({ behavior: 'smooth' })
        }, "<")
      }

      setTl(timeline)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const onEnter = ({ currentTarget }: any) => {
    gsap.to(currentTarget, { scale: 1.2 });
  }

  const onLeave = ({ currentTarget }: any) => {
    gsap.to(currentTarget, { scale: 1 });
  }

  const onClick = () => {
    tl?.play(0)
    onBeerClicked()
  }

  useEffect(() => {
    if (isModalClosing) {
      tl?.reverse()
    }
  }, [isModalClosing])

  if (side === 'left') {
    // beer on the left
    return (
      <div
        ref={rootRef}
        key={ beer.name }
        className={`beer ${side} ${className}`}>
        <div className='beer-info'>
          <h1 className='beer-name'>{ beer.name }</h1>
          <h4 className='beer-subtitle'>{ beer.subtitle }</h4>
          <button
            className='see-more'
            onClick={onClick}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}>
            See more <span>+</span>
          </button>
        </div>
        <img src={beerImage} className='beer-img' alt={`${beer.name} image`} />
      </div>
    )
  } else {
    // beer on the right
    return (
      <div
        ref={rootRef}
        key={ beer.name }
        className={`beer ${side} ${className}`}>
        <img src={beerImage} className='beer-img' alt={`${beer.name} image`} />
        <div className='beer-info'>
          <h1 className='beer-name'>{ beer.name }</h1>
          <h4 className='beer-subtitle'>{ beer.subtitle }</h4>
          <button
            className='see-more'
            onClick={onClick}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}>
            See more <span>+</span>
          </button>
        </div>
      </div>
    )
  }
}