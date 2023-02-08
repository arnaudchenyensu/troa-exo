import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface Props {
  beer: any
  closing: boolean
  onClosingDone: () => void
}

export default function BeerModal({ beer, closing, onClosingDone }: Props) {
  const rootRef = useRef()
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true })
      timeline.fromTo(
        rootRef.current,
        { x: '100%' },
        {
          x: '0%',
          onReverseComplete: onClosingDone
        }
      )
      timeline.play(0)

      setTl(timeline)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (closing) {
      tl?.reverse()
    }
  }, [closing])

  return (
    <div ref={rootRef} className='modal'>
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
    </div>
  )
}