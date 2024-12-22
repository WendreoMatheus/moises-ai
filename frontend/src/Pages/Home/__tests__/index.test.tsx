import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'jotai'
import { createStore } from 'jotai'
import Home from '@/Pages/Home'
import { Server } from 'miragejs'
import { makeServer } from '@/mirage/server'
import { MemoryRouter } from 'react-router'

describe('Home Component', () => {
  let store: ReturnType<typeof createStore>
  let server: Server

  beforeAll(() => {
    server = makeServer()
  })

  afterAll(() => {
    server.shutdown()
  })

  beforeEach(() => {
    store = createStore()
  })

  test('displays user data on successful fetch', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'WendreoMatheus' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }))

    await waitFor(() => {
      expect(screen.getByText(/Wendreo Matheus/i)).toBeInTheDocument()
    })
  })

  test('shows error message on failed fetch', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'invaliduser' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }))

    await waitFor(() => {
      expect(screen.getByText('Usuário não encontrado')).toBeInTheDocument()
    })
  })
})
