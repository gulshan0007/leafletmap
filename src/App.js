import React from 'react'
import Home from './pages/home'
import Base from './base'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Iii from './iii'
import Demo from './demo'
import WhoWeAre from './whoweare'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Demo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/index" element={<Iii />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
