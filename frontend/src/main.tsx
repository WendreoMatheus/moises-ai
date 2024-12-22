import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './App.router.tsx'

// Apenas se quiser usar o servidor mockado de testes
// if (process.env.NODE_ENV === 'development') {
// makeServer()
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
)
