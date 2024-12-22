import { Route, BrowserRouter as Router, Routes } from 'react-router'
import './App.css'
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { NavHeader } from '@/components/NavHeader'
import React, { Suspense } from 'react'

const Home = React.lazy(() => import('@/Pages/Home'))
const Profile = React.lazy(() => import('@/Pages/Profile'))
const Repo = React.lazy(() => import('@/Pages/Repo'))

const AppRouter = () => {
  return (
    <Router>
      <NavHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/repo/:username/:repoName" element={<Repo />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRouter
