

export default function RoomCreation() {
  return (
    <main>
      <BackButton />
      <CreationForm />
    </main>
  )
}

function BackButton() {
  return (
    <button onClick={() => history.back()}>Back</button>
  )
}

function CreationForm() {
  return (
    <section>
      <h1>Create a Room</h1>
      <form>
        <label htmlFor="username">Your name:</label>
        <input type="text" id="username" name="username" />
        <button type="submit">Create Room</button>
      </form>
      <section>
        <p>
          <b>Note:</b>
          After creating the room, you'll receive a unique room code
          to share with your friends.
          As the host, you'll have control to finish the voting and
          draw the winning movie.
        </p>
      </section>
    </section>
  )
}
