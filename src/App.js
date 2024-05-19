import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import TrainFlood from './pages/trainflood'
import WhoWeAre from './whoweare'
import Past from './pages/past'
import Header from './components/Header'


function App() {
  return (
    <div className='bg-orange-200'>
    <BrowserRouter>
    <Header /> 
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/train' element={<TrainFlood />} />
      <Route path='/about' element={<WhoWeAre />} />
      <Route path='/past' element={<Past />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
