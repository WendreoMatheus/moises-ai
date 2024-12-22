import { NavHeader } from '@/components/NavHeader'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma/css/bulma.min.css'
import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import './App.css'

const Home = React.lazy(() => import('@/Pages/Home'))
const Song = React.lazy(() => import('@/Pages/Song'))

const AppRouter = () => {
  return (
    <Router>
      <NavHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song/:songId" element={<Song />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRouter
