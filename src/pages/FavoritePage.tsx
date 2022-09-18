import { useEffect, useState } from 'react'
import './home.css'
import clockImage from '../assets/clock.svg'
import favoriteImage from '../assets/favorite.svg'
import { Link } from 'react-router-dom'

function Favorite() {
  return (
    <section className='container'>
      <header className='header'>
        <h1>hacker news</h1>
      </header>

      <div className='filter'>
        <Link to='/'>All</Link>
        <Link to='/favorites' className='selected'>
          My faves
        </Link>
      </div>

      <div className='grid-cards'>
        {/* {data.map((hit, index) => {
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
        })} */}
      </div>
      <div className='pagination'></div>
    </section>
  )
}

export default Favorite
