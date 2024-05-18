import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import TrainFlood from './pages/trainflood'


function App() {
  return (
    <div className='bg-orange-200'>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/train' element={<TrainFlood />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
