import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import reactImage from './assets/react.png'
import angularImage from './assets/angular.png'
import vueImage from './assets/vue.png'
import clockImage from './assets/clock.svg'
import favoriteImage from './assets/favorite.svg'

interface IHits {
  readonly author: string
  readonly comment_text: string
  readonly created_at: '2022-09-17T09:19:27.000Z'
  readonly created_at_i: 1663406367
  readonly num_comments?: string
  readonly objectID: '32876047'
  readonly parent_id: 32874213
  readonly points?: string
  readonly story_id: 32874086
  readonly story_text?: string
  readonly story_title: string
  readonly story_url: string
  readonly title?: string
  readonly url?: string
}

function Home() {
  const [data, setData] = useState<IHits[]>([])
  const [technology, setTechnology] = useState<string>('reactjs')
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${technology}&page=${page}`)
        // console.log('testing', await res.json())
        // hitsPerPage: 20
        // nbHits: 5867
        // nbPages: 50
        // page: 0
        const { hits } = await res.json()
        // console.log('hits', hits)
        setData(hits)
      } catch (err: unknown) {
        console.error({ err })
      }
    }

    fetchData()
  }, [technology, page])

  const handleFilterByTechnology = (): void => {
    const selectText = document.querySelector('.select-text')
    const options = Array.from(document.getElementsByClassName('options'))
    const list = document.querySelector('.list')
    const arrowIcon = document.getElementById('arrow-icon')

    list?.classList.toggle('hide')
    arrowIcon?.classList.toggle('rotate')

    options.forEach((option) => {
      option.addEventListener('click', () => {
        if (option.textContent) {
          selectText!.innerHTML = option.textContent
          list?.classList.toggle('hide')
          arrowIcon?.classList.toggle('rotate')

          setTechnology(option.textContent.toLocaleLowerCase())
        }
      })
    })
  }

  const handlePagination = (event: any) => {
    console.log('event', event.target.innerHTML)
    setPage(+event.target.innerHTML)

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
        {data.map((hit, index) => {
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
          <li className='btn-prev'>
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
          </li>
        </ul>
      </section>
    </section>
  )
}

export default Home
