import Link from 'next/link';
import { Button } from '../components/Button';

export default function Page() {
  return (
    <div className="max-w-xl h-screen py-10 mx-auto
      flex flex-col justify-start gap-4
    "
    >
      <header className="prose">
        <h1 className="text-3xl text-center font-bold">🎬 Movie Night</h1>
        <p className="text-lg">
          Create a room, invite friends, 
          vote on movies,
          and let fate decide!.
        </p>
      </header>
      <div className="mx-auto flex items-center gap-2">
        <Link href="/create"><Button>Create Room</Button></Link>
        <Link href="/join"><Button>Join Room</Button></Link>
      </div>
      <article className="prose w-fit">
        <h3 className="font-bold">How it Works</h3>
        <ol>
          <li>Create or join a room.</li>
          <li>Everyone adds movie suggestions.</li>
          <li>Vote with upvotes &amp; downvotes.</li>
          <li>Host locks and draws a random winner.</li>
          <li>Enjoy the movie!</li>
        </ol>
      </article>
      <span className="my-auto"></span>
      <footer className="text-center text-sm">
        © 2025 RickBarretto
      </footer>
    </div>
  );
}
