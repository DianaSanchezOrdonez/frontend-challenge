import { useEffect, useState } from 'react'
import './home.css'
import clockImage from './assets/clock.svg'
import favoriteImage from './assets/favorite.svg'
import { Link } from 'react-router-dom'

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

function Favorite() {
  const [data, setData] = useState<IHits[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=0')
      const { hits } = await res.json()
      console.log('hits', hits)
      setData(hits)
    }

    fetchData()
  }, [])

  return (
    <div className='container'>
      <header className='header'>
        <h1>hacker news</h1>
      </header>

      <div className='filter'>
        <Link to='/'>All</Link>
        <Link to='/favorites' className='selected'>My faves</Link>
      </div>

      <div className='grid-cards'>
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
        {/* {data.map((el) => {
          ;<div className='grid-cards-inner'>
            <div className='card-body'>
              <div>
                <img src={clockImage} alt='clock' />
                <span>3 hours ago by author</span>
              </div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat distinctio dolor, nisi laborum quos
                odio unde consectetur asperiores odit omnis!
              </p>
            </div>
            <div className='action-fav'>
              <input type='image' src={favoriteImage} alt='submit'></input>
            </div>
          </div>
        })} */}
      </div>
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
      <div className='pagination'></div>
    </div>
  )
}

export default Favorite
