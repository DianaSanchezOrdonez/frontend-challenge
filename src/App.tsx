import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage'
import Favorite from './pages/FavoritePage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favorites' element={<Favorite />} />
    </Routes>
  )
}

export default App
