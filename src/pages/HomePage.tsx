import { useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import { useHit } from '../hooks/fetchAllHits'
import Pagination from '../components/Pagination'
import { Hit } from '../interfaces/fetchAllHitsResponse'
import TechnologyFilter from '../components/TechnologyFilter'
import CardList from '../components/CardList'

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

      {data && <CardList data={data} favorites={favorites} handleFavorites={handleFavorites} />}

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
