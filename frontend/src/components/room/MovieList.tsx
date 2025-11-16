import { Card } from "../Card";

type Movie = {
  title: string;
  year: number;
  by: string;
}

export function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <Card>
      <h2>Movies ({ movies.length })</h2>
      <ul>
        {movies.map((movie: Movie, index: number) => (
          <MovieItem key={index} movie={movie} />
        ))}
      </ul>
    </Card>
  );
}

function MovieItem({ key, movie }: { key: number, movie: Movie }) {
  return <li>
    <h3>{ movie.title }</h3>
    <div>
      <span>{ movie.year }</span>
      <span>{ movie.by }</span>
    </div>
  </li>
}