import { SONG_LIST_ERROR_ATOM } from '@/atoms/SongList.atom'
import { ErrorMessage } from '@/components'
import SongForm from '@/components/SongForm'
import { useAtomValue } from 'jotai'
import { NavLink } from 'react-router'
import './NewSong.css'

const NewSong = () => {
  const error = useAtomValue(SONG_LIST_ERROR_ATOM)

  return (
    <div className="container new-song is-flex">
      {error && <ErrorMessage message={error} />}
      <div className="header">
        <h1 className="title">
          <NavLink to={'/admin'}> Admin </NavLink> / NewSong
        </h1>
        <SongForm />
      </div>
    </div>
  )
}

export default NewSong
