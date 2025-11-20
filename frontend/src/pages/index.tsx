import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="max-w-xl h-screen py-10 mx-auto
      flex flex-col justify-start gap-4"
    >
      <header className="prose prose-invert">
        <h1 className="text-3xl text-center font-bold">🎬 Movie Night</h1>
        <p className="text-lg">
          Create a room, invite friends, 
          vote on movies,
          and let fate decide!.
        </p>
      </header>
      <div className="mx-auto flex items-center gap-2">
        <Link href="/create"><Button className='cursor-pointer'>Create Room</Button></Link>
        <Link href="/join"><Button className='cursor-pointer'>Join Room</Button></Link>
      </div>
      <article className="prose prose-invert w-fit">
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
      <footer className="prose prose-invert text-center text-sm">
        © 2025 RickBarretto
      </footer>
    </div>
  );
}
