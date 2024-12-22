import { USERNAME_ATOM, GET_USER_ATOM } from '@/atoms/user.atom'
import { useForm } from 'react-hook-form'
import { useSetAtom } from 'jotai'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const searchFieldSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'O nome de usuário deve ter pelo menos 1 caractere.' })
    .max(39, { message: 'O nome de usuário deve ter no máximo 39 caracteres.' }),
})

const SearchField = () => {
  const setUsername = useSetAtom(USERNAME_ATOM)
  const searchUser = useSetAtom(GET_USER_ATOM)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string }>({
    resolver: zodResolver(searchFieldSchema),
  })
  const onSubmit = (data: { username: string }) => {
    setUsername(data.username)
    searchUser()
  }

  return (
    <div className="container">
      <div className="box" style={{ maxWidth: '400px', margin: '36px auto' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Nome de Usuário</label>
            <div className="control has-icons-left">
              <input
                className={`input ${errors.username ? 'is-danger' : ''}`}
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Nome de usuário é obrigatório' })}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
            {errors.username && <p className="help is-danger">{errors.username.message}</p>}
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary is-fullwidth">
                <span className="has-text-white">Buscar</span>
                <span className="icon is-small">
                  <i className="has-text-white fa-solid fa-magnifying-glass"></i>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchField
