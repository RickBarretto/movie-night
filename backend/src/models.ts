
export type Owner = string
export type RoomCode = string
export type RoomState = 'open' | 'closed'
export type RoomData = {
  host: string
  code: string
  movies: MovieSuggestion[]
  state: RoomState,
  winner: MovieSuggestion | null
}

export type MovieID = string
export type Title = string
export type Year = number
export type Username = string

export type MovieSuggestion = {
  id: MovieID
  title: Title
  year: Year | null
  by: Username
}

export const newId = (): string => Math.random().toString(36).substring(2, 15)
export const newOwner: () => string = (): Owner => "owner-" + newId()
export const newCode = (): RoomCode => "room-" + newId()
export const newMovieID = (): MovieID => "movie-" + newId()

export function choose<T>(xs: T[]): T {
  return xs[Math.floor(Math.random() * xs.length)]
}

export class Room {
  readonly code: RoomCode

  readonly host: Username
  readonly owner: string

  readonly movies: MovieSuggestion[]
  private _state: RoomState
  private _winner: MovieSuggestion | null

  constructor(host: Username) {
    this.code = newCode()
    this.owner = newOwner()
    this.movies = []
    this._state = 'open'
    this._winner = null

    this.host = host
  }
  
  get state(): RoomState {
    return this._state
  }
  
  get winner(): MovieSuggestion | null {
    return this._winner
  }
  
  isOpen(): boolean {
    return this._state === 'open'
  }
  
  isClosed(): boolean {
    return this._state === 'closed'
  }
  
  isHost(username: Username, key: Owner): boolean {
    return this.host === username && this.owner === key
  }
  
  suggested(): MovieSuggestion[] {
    return this.movies.map(movie => movie)
  }

  suggestMovie(movie: MovieSuggestion) {
    this.movies.push(movie);
  }

  drawWinner(): MovieSuggestion {
    const winner: MovieSuggestion = choose(this.movies)
    this._winner = winner;
    this.close()
    return winner;
  }
  
  private close() {
    this._state = 'closed'
  }

}