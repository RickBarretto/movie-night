import { Button } from '../components/Button';

export function Welcome() {
  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">🎬 Movie Night</h1>
        <p className="text-lg">
          Create a room, invite friends, 
          vote on movies,
          and let fate decide!.
        </p>
      </header>
      <div className="flex flex-col items-center gap-2">
        <Button>Creaye Room</Button>
        <Button>Join Room</Button>
      </div>
      <article className="prose">
        <h2 className="text-2xl font-bold">How it Works</h2>
        <ul>
          <li>Create or join a room.</li>
          <li>Everyone adds movie suggestions.</li>
          <li>Vote with upvotes &amp; downvotes.</li>
          <li>Host locks and draws a random winner.</li>
          <li>Enjoy the movie!</li>
        </ul>
      </article>
      <p className="prose text-sm">© 2025 RickBarretto</p>
    </div>
  );
}
