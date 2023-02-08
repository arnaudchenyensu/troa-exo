import beerImage from '../assets/beer.png'
import { gsap } from 'gsap'

interface Props {
  beer: any
  onBeerClicked: () => void
  side: string
}

export default function Beer({
  beer,
  onBeerClicked,
  side,
}: Props) {
  const onEnter = ({ currentTarget }: any) => {
    gsap.to(currentTarget, { scale: 1.2 });
  };

  const onLeave = ({ currentTarget }: any) => {
    gsap.to(currentTarget, { scale: 1 });
  };

  if (side === 'even') {
    // beer on the left
    return (
      <div key={ beer.name } className={`beer ${side}`}>
        <div className='beer-info'>
          <h1 className='beer-name'>{ beer.name }</h1>
          <h4 className='beer-subtitle'>{ beer.subtitle }</h4>
          <button
            className='see-more'
            onClick={() => onBeerClicked()}
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
      <div key={ beer.name } className={`beer ${side}`}>
        <img src={beerImage} className='beer-img' alt={`${beer.name} image`} />
        <div className='beer-info'>
          <h1 className='beer-name'>{ beer.name }</h1>
          <h4 className='beer-subtitle'>{ beer.subtitle }</h4>
          <button
            className='see-more'
            onClick={() => onBeerClicked()}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}>
            See more <span>+</span>
          </button>
        </div>
      </div>
    )
  }
}