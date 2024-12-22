import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchField from '@/components/SearchField'
import { Provider } from 'jotai'
import { USERNAME_ATOM, GET_USER_ATOM } from '@/atoms/user.atom'
import { createStore } from 'jotai'

describe('SearchField Component', () => {
  const mockStore = createStore()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders form elements correctly', () => {
    render(
      <Provider store={mockStore}>
        <SearchField />
      </Provider>
    )

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  })

  test('shows validation error for empty input', async () => {
    render(
      <Provider store={mockStore}>
        <SearchField />
      </Provider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    await waitFor(() => {
      expect(
        screen.getByText('O nome de usuário deve ter pelo menos 1 caractere.')
      ).toBeInTheDocument()
    })
  })

  test('updates the atom and calls the search function on valid input', async () => {
    const setUsernameMock = jest.fn()
    const searchUserMock = jest.fn()

    jest.spyOn(mockStore, 'set').mockImplementation((atom, value) => {
      if (atom === USERNAME_ATOM) setUsernameMock(value)
      if (atom === GET_USER_ATOM) searchUserMock()
    })

    render(
      <Provider store={mockStore}>
        <SearchField />
      </Provider>
    )

    const input = screen.getByPlaceholderText('Username')
    fireEvent.change(input, { target: { value: 'testuser' } })
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    await waitFor(() => {
      expect(setUsernameMock).toHaveBeenCalledWith('testuser')
      expect(searchUserMock).toHaveBeenCalled()
    })
  })
})
