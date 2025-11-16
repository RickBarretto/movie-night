

export default function Welcome() {
  return (
    <main>
      <Header />
      <div>
        <button>Create Room</button>
        <button>Join Room</button>
      </div>
      <Explanation />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header>
      <h1>🎬 Movie Night</h1>
      <p>
        Create a room, invite friends, vote on movies,
        and let fate decide!.
      </p>
    </header>
  );
}

function Explanation() {
  return (
    <article>
      <h2>How it Works</h2>
      <ul>
        <li>Create or join a room.</li>
        <li>Everyone adds movie suggestions.</li>
        <li>Vote with upvotes &amp; downvotes.</li>
        <li>Host locks and draws a random winner.</li>
        <li>Enjoy the movie!</li>
      </ul>
    </article>
  )
}

function Footer() {
    return <p>© 2025 RickBarretto</p>;
}

