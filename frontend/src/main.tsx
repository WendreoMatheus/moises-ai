import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './App.router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
)
