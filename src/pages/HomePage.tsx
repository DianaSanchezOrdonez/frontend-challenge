import { useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import clockImage from '../assets/clock.svg'
import { useHit } from '../hooks/fetchAllHits'
import Pagination from '../components/Pagination'
import { Hit } from '../interfaces/fetchAllHitsResponse'
import TechnologyFilter from '../components/TechnologyFilter'

function Home() {
  const [technology, setTechnology] = useState<string>('reactjs')
  const [favorites, setFavorites] = useState<Hit[]>([])

  const pageNumberLimit: number = 10
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [maxPageLimit, setMaxPageLimit] = useState<number>(10)
  const [minPageLimit, setMinPageLimit] = useState<number>(0)

  const { data } = useHit(technology, currentPage)

  const onTechnologyChange = (): void => {
    const selectText: Element = document.querySelector('.select-text') as Element
    const options: Element[] = Array.from(document.getElementsByClassName('options')) as Element[]
    const list: Element = document.querySelector('.list') as Element
    const arrowIcon: Element = document.getElementById('arrow-icon') as Element

    list.classList.toggle('hide')
    arrowIcon.classList.toggle('rotate')

    options.forEach((option) => {
      option.addEventListener('click', () => {
        if (option.textContent) {
          selectText.innerHTML = option.textContent
          list.classList.toggle('hide')
          arrowIcon.classList.toggle('rotate')

          setTechnology(option.textContent.toLocaleLowerCase())
        }
      })
    })
  }

  const handleFavorites = (hit: Hit) => {
    let arrayFavoriteIds = favorites
    let addFavorite = true

    arrayFavoriteIds.map((item, index) => {
      if (item.objectID === hit.objectID) {
        arrayFavoriteIds.splice(index, 1)
        addFavorite = false
      }
    })

    if (addFavorite) {
      arrayFavoriteIds.push(hit)
    }

    setFavorites([...arrayFavoriteIds])
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit)
      setMinPageLimit(minPageLimit - pageNumberLimit)
    }
    setCurrentPage((prev) => prev - 1)
  }

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit)
      setMinPageLimit(minPageLimit + pageNumberLimit)
    }
    setCurrentPage((prev) => prev + 1)
  }

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    totalPages: data?.nbPages ?? 20,
  }

  return (
    <section className='container'>
      <header className='header'>
        <h1>hacker news</h1>
      </header>

      <div className='filter'>
        <Link to='/' className='selected'>
          All
        </Link>
        <Link to='/favorites'>My faves</Link>
      </div>

      <TechnologyFilter onTechnologyChange={onTechnologyChange} />

      <section className='grid-cards'>
        {data?.hits.map((hit, index) => {
          return (
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
        })}
      </section>

      <Pagination
        {...paginationAttributes}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        onPageChange={onPageChange}
      />
    </section>
  )
}

export default Home
