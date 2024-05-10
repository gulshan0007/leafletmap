import React from 'react'
import Home from './pages/home'
import Base from './base'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Iii from './iii'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Base />} />
        <Route path="/home" element={<Home />} />
        <Route path="/index" element={<Iii />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
