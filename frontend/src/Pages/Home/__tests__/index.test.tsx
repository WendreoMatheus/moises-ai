import { render, screen, waitFor } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { Route, MemoryRouter as Router, Routes } from 'react-router'
import { Server } from 'miragejs'
import { makeServer } from '@/mirage/server'
import Profile from '..'

describe('Profile Component', () => {
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

  test('fetches and displays the list of repositories', async () => {
    const { container } = render(
      <Provider store={store}>
        <Router initialEntries={['/profile/WendreoMatheus']}>
          <Routes>
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </Router>
      </Provider>
    )

    await waitFor(() => {
      expect(container.querySelectorAll('.repo-card').length).toEqual(28)
    })
  })

  test('displays error message on failure', async () => {
    render(
      <Provider store={store}>
        <Router initialEntries={['/profile/Xorume']}>
          <Routes>
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </Router>
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText(/Repositórios não encontrados/i)).toBeInTheDocument()
    })
  })
})
