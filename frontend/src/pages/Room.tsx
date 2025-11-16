

export default function HostRoom() {
  return (
    <main>
    </main>
  )
}

function RoomDetails({ name, host }: 
  { name: string, host: boolean }
) {
  return (
    <div>
      <div>
        <h2>Movie Night ROom</h2>
        {(host)? <button>Leave</button> : <span></span> }
      </div>
      <section>
        <span>{name} <Role role={host ? 'Host' : 'Guest'} /></span>
      </section>
    </div>
  );
}

function ExitRoom() {
  return (
    <button>Leave</button>
  );
}

function HostName({ name }: { name: string }) {
  return (
    <span>{name}<span className="role">Host</span></span>
  );
}

function GuestName({ name }: { name: string }) {
  return (
    <span>{name}</span>
  );
}

function HostControls() {
  return (
    <section className="host-controls">
      <h2>Host Controls</h2>
      <button>Finish &amp; Draw Winner</button>
      <span>
        Lock the room and automatically draw a random winner.
        You must finish the room before you can leave.
      </span>
    </section>
  );
}

function AddMovieForm() {
  <section>
    <h2>Add a Movie</h2>
    <form>
      <label htmlFor="movie-title">Movie Title*</label>
      <input id="movie-title" type="text" />
      <label htmlFor="movie-year">Year (Optional)</label>
      <input id="movie-year" type="number" />
      <button type="submit">Add Movie</button>
      <button type="button">Cancel</button>
    </form>
  </section>
}

type Movie = {
  title: string
  year: number
  creator: string
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <li key={movie.id}>
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <div>
          <span>{movie.year}</span>
          <span>{movie.creator}</span>
        </div>
      </div>
    </li>
  );
}

function MovieList({ movies }: 
  { movies: Movie[] }
) {
  return (
    <section>
      <h2>Movies ({ movies.length })</h2>
      <ul>
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </ul>
    </section>
  );
}
