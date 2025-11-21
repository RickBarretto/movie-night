"use client"

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col w-full max-w-xl h-screen mx-auto py-16">
      <header className="flex flex-col gap-2">
        <Title>Movie Night</Title>
        <Description>
          Create a room, invite friends, vote on movies, and let fate decide!.
        </Description>
      </header>
    
      <main className="flex flex-col gap-4 place-items-center grow mt-8">
        <article className="w-xl">
          <Subheader>How it Works</Subheader>
          <List>
            <li>Create or join a room.</li>
            <li>Everyone adds movie suggestions.</li>
            <li>Vote with upvotes &amp; downvotes.</li>
            <li>Host locks and draws a random winner.</li>
            <li>Enjoy the movie!</li>
          </List>
        </article>
    
        <div className="flex gap-2">
          <Link href="/create">
            <Button className="cursor-pointer">Create Room</Button>
          </Link>
          <Link href="/join">
            <Button className="cursor-pointer">Join Room</Button>
          </Link>
        </div>
      </main>
    
      <footer className="flex-col gap-5 mx-auto">
        <Muted>© 2025 RickBarretto</Muted>
      </footer>
    </div>
  );
}


const Title = ({children}) => {
  return (
    <h1 className="scroll-m-20 
      text-center text-4xl font-extrabold tracking-tight text-balance"
    >
      { children }
    </h1>
  )
}

const Subheader = ({children}) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"
    >
      { children }
    </h3>
  )
}

const Description = ({children}) => {
  return (
    <p className="text-muted-foreground text-xl">
      { children }
    </p>
  )
}

const List = ({children}) => {
  return (
    <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
      {children}
    </ul>
  )
}

const Muted = ({children}) => {
  return (
    <p className="text-muted-foreground text-sm">
      { children }
    </p>
  )
}