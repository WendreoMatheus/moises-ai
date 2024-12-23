export interface ISong {
  id: number
  albumTitle: string
  title: string
  is_favorite: boolean
  coverArt: string
}

export type ISongDetails = Omit<ISong, 'coverArt' | 'albumTitle'> & {
  album: IAlbum
  audio_file: string
}

export interface IArtist {
  id: number
  name: string
}

export interface IAlbum {
  title: string
  year: number
  coverArt: string
  poster: string
  artist: IArtist
}
