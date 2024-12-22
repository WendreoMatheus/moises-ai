import { makeServer } from '@/mirage/server'
import { render, screen, waitFor } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { Server } from 'miragejs'
import { MemoryRouter as Router, Routes, Route } from 'react-router'
import { Repo } from '@/Pages'

describe('RepoDetail', () => {
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

  it('deve exibir o componente de loading enquanto os dados estão sendo carregados', async () => {
    render(
      <Provider store={store}>
        <Router initialEntries={['/repo/WendreoMatheus/101DaysSwift']}>
          <Routes>
            <Route path="/repo/:username/:repoName" element={<Repo />} />
          </Routes>
        </Router>
      </Provider>
    )

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('deve exibir uma mensagem de repositório não encontrado se não houver erro, mas também nenhum repositório', async () => {
    render(
      <Provider store={store}>
        <Router initialEntries={['/repo/unknown/unknown']}>
          <Routes>
            <Route path="/repo/:username/:repoName" element={<Repo />} />
          </Routes>
        </Router>
      </Provider>
    )
    await waitFor(() => {
      expect(screen.getByText('Erro ao buscar repositório')).toBeInTheDocument()
    })
  })

  it('deve exibir as informações do repositório quando os dados estiverem disponíveis', async () => {
    render(
      <Provider store={store}>
        <Router initialEntries={['/repo/WendreoMatheus/101DaysSwift']}>
          <Routes>
            <Route path="/repo/:username/:repoName" element={<Repo />} />
          </Routes>
        </Router>
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Profile: WendreoMatheus')).toBeInTheDocument()
      expect(screen.getByText('Detalhes: 101DaysSwift')).toBeInTheDocument()
      expect(screen.getByText('Visite o repositório no GitHub')).toHaveAttribute(
        'href',
        'https://github.com/WendreoMatheus/100DaysSwift'
      )
    })
  })
})
