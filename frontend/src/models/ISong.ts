export interface ISong {
    id:   number;
    artist: string;
    title:  string;
    isFavorite: boolean;
    coverArt:  string;
}

export type ISongDetails  = Omit<ISong, 'coverArt' | 'artist'> & {
    album:  IAlbum;
    artist: IArtist;
    files:  IFiles;
}

export interface IArtist {
    id: number;
    name: string;
}

export interface IAlbum {
    title: string;
    year:  number;
}

export interface IFiles {
    coverArt: string;
    poster:   string;
    audio:    string;
}