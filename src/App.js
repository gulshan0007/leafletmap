import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import TrainFlood from './pages/trainflood'
import Past from './pages/past'
import Header from './components/Header'
import WhoWeAre from './pages/whoweare'
import BlogList from './pages/BlogList'
import Blog from './pages/Blog'


function App() {
  return (
    <>
    <BrowserRouter>
    <Header /> 
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/train' element={<TrainFlood />} />
      <Route path='/about' element={<WhoWeAre />} />
      <Route path='/past' element={<Past />} />
      <Route path='/blog' element={<BlogList/>} />
      <Route path='/blog/:id' element={<Blog/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
