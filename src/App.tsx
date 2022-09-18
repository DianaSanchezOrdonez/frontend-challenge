import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Favorite from './Favorite'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favorites' element={<Favorite />} />
    </Routes>
  )
}

export default App
