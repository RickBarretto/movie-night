
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
  year: Year
  by: Username
}

export const newId = (): string => Math.random().toString(36).substring(2, 15)
export const newCode = (): RoomCode => "room-" + newId()
export const newMovieID = (): MovieID => "movie-" + newId()

export function choose<T>(xs: T[]): T {
  return xs[Math.floor(Math.random() * xs.length)]
}

export class Room {

  constructor(
    readonly host: Username = "Anonymous",
    readonly code: RoomCode = newCode(),
    readonly movies: MovieSuggestion[] = [],
    private _state: RoomState = 'open',
    private _winner: MovieSuggestion | null = null
  ) { }
  
  get state(): RoomState {
    return this._state
  }
  
  isOpen(): boolean {
    return this._state === 'open'
  }
  
  isClosed(): boolean {
    return this._state === 'closed'
  }
  
  suggested(): MovieSuggestion[] {
    return this.movies.map(movie => movie)
  }

  get asObject(): RoomData {
    return {
      host: this.host,
      code: this.code,
      movies: this.movies,
      state: this._state,
      winner: this._winner
    }
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