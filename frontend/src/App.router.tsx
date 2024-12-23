import { NavHeader } from '@/components/NavHeader'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma/css/bulma.min.css'
import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import './App.css'
import Admin from './Pages/Admin'
import { Loading } from './components'

const Home = React.lazy(() => import('@/Pages/Home'))
const SongDetail = React.lazy(() => import('@/Pages/SongDetail'))
const NewSong = React.lazy(() => import('@/Pages/NewSong'))
const EditSong = React.lazy(() => import('@/Pages/EditSong'))

const AppRouter = () => {
  return (
    <Router>
      <NavHeader />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/new-song" element={<NewSong />} />
          <Route path="/admin/edit/:songId" element={<EditSong />} />
          <Route path="/songs/:songId" element={<SongDetail />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRouter
