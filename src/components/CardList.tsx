import { Hit } from '../interfaces/fetchAllHitsResponse'
import clockImage from '../assets/clock.svg'
import { CardListProps } from '../interfaces/cardListProps'

const CardList = (props: CardListProps) => {
  const { data, favorites } = props

  const handleFavorites = (hit: Hit) => {
    props.handleFavorites(hit)
  }

  return (
    <section className='grid-cards'>
      {data.hits.map((hit, index) => {
        return (
          hit.objectID &&
          hit.author &&
          hit.story_title && (
            <div className='grid-cards-inner' key={index} id={hit.objectID} onClick={() => handleFavorites(hit)}>
              <div className='card-body'>
                <div>
                  <img src={clockImage} alt='clock' />
                  <span>3 hours ago by {hit.author}</span>
                </div>
                <p>{hit.story_title}</p>
              </div>
              <div className='action-fav'>
                {favorites.includes(hit) ? (
                  <button>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='22' viewBox='0 0 24 22'>
                      <path
                        fill='#DD0031'
                        d='M12 3.248C8.852-2.154 0-.577 0 6.192 0 10.853 5.571 15.619 12 22c6.43-6.381 12-11.147 12-15.808C24-.6 15.125-2.114 12 3.248z'
                      />
                    </svg>
                  </button>
                ) : (
                  <button>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='22' viewBox='0 0 24 22'>
                      <path
                        fill='#DD0031'
                        d='M12 8.229C12.234 7.109 13.547 2 17.382 2 19.602 2 22 3.551 22 7.003c0 3.907-3.627 8.47-10 12.629C5.627 15.473 2 10.91 2 7.003c0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zM0 7.003C0 11.071 3.06 16.484 12 22c8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737C9.662-1.996 0-1.004 0 7.003z'
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )
        )
      })}
    </section>
  )
}

export default CardList
