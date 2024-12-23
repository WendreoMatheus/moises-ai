import { NavHeader } from '@/components/NavHeader'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma/css/bulma.min.css'
import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import './App.css'
import Admin from './Pages/Admin'
import NewSong from './Pages/NewSong'

const Home = React.lazy(() => import('@/Pages/Home'))
const SongDetail = React.lazy(() => import('@/Pages/SongDetail'))

const AppRouter = () => {
  return (
    <Router>
      <NavHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/new-song" element={<NewSong />} />
          <Route path="/songs/:songId" element={<SongDetail />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRouter
