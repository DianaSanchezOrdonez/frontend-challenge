import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import reactImage from '../assets/react.png'
import angularImage from '../assets/angular.png'
import vueImage from '../assets/vue.png'
import clockImage from '../assets/clock.svg'
import favoriteImage from '../assets/favorite.svg'
import { useHit } from '../hooks/fetchAllHits'

interface IPagination {
  readonly page: number
  readonly totalPages?: number
}

function Home() {
  const [technology, setTechnology] = useState<string>('reactjs')
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    totalPages: 0,
  })
  const [currentPage, setCurrentPage] = useState(1)

  // const [page, setPage] = useState<number>(0)
  // const [pageLength, setPageLength] = useState<number>(1)
  const { data } = useHit(technology, pagination.page)

  const handleFilterByTechnology = (): void => {
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

  const handlePagination = (event: any) => {
    console.log('event', event.target.innerHTML)
    setPagination({ page: Number(event.target.innerHTML) })

    //console.log(event)
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

      <div className='selector' onClick={handleFilterByTechnology}>
        <div>
          <p className='select-text'>Select your news</p>
          <i className='fa fa-chevron-down' id='arrow-icon'></i>
        </div>

        <ul className='list hide'>
          <li className='options'>
            <img src={angularImage} alt='angular' />
            <p>Angular</p>
          </li>
          <li className='options'>
            <img src={reactImage} alt='reactjs' />
            <p>Reactjs</p>
          </li>
          <li className='options'>
            <img src={vueImage} alt='reactjs' />
            <p>Vuejs</p>
          </li>
        </ul>
      </div>

      <section className='grid-cards'>
        {data?.hits.map((hit, index) => {
          return (
            <div className='grid-cards-inner' key={index}>
              <div className='card-body'>
                <div>
                  <img src={clockImage} alt='clock' />
                  <span>3 hours ago by {hit.author}</span>
                </div>
                <p>{hit.story_title}</p>
              </div>
              <div className='action-fav'>
                <input type='image' src={favoriteImage} alt='submit'></input>
              </div>
            </div>
          )
        })}
      </section>
      {/* <main className='content'>
        <div className='filter'>
          <button className='all'>All</button>
          <button className='favorites'>My faves</button>
        </div>
        <div className='filter-stack'>
          <select>
            <option>Select your news</option>
            <option>Angular</option>
            <option>
              <img src={reactImage} alt='reactjs' />
              Reactjs
            </option>
            <option>
              <img src={reactImage} alt='reactjs' />
              Vuejs
            </option>
          </select>
        </div>
      </main> */}
      {/* <div className='cards-content'>
        <div className='card'>
          <div className='card-body'>
            <div>
              <img src={clockImage} alt='clock' />
              <p>3 hours ago by author</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, assumenda.</p>
          </div>
          <div className='card-action'>
            <img src={favoriteImage} alt='heart' />
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div>
              <img src={clockImage} alt='clock' />
              <p>3 hours ago by author</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, assumenda.</p>
          </div>
          <div className='card-action'>
            <img src={favoriteImage} alt='heart' />
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div>
              <img src={clockImage} alt='clock' />
              <p>3 hours ago by author</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, assumenda.</p>
          </div>
          <div className='card-action'>
            <img src={favoriteImage} alt='heart' />
          </div>
        </div>
      </div> */}
      <section className='pagination'>
        <ul onClick={handlePagination}>
          {/* <li className='btn-prev'>
            <i className='fa fa-angle-left'></i>
          </li>
          <li className='numb'>1</li>
          <li className='numb'>2</li>
          <li className='numb active'>3</li>
          <li className='numb'>4</li>
          <li className='numb'>5</li>
          <li className='numb'>6</li>
          <li className='dots'>...</li>
          <li className='numb'>21</li>
          <li className='btn-next'>
            <i className='fa fa-angle-right'></i>
          </li> */}
        </ul>
      </section>
    </section>
  )
}

export default Home
