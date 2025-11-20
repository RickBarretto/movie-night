import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <Card className="w-full max-w-xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-xl">🎬 Movie Night</CardTitle>
        <CardDescription>
          Create a room, invite friends, vote on movies, and let fate decide!.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <article className="w-fit">
          <h3 className="font-bold">How it Works</h3>
          <ol className="list-decimal pl-6">
            <li>Create or join a room.</li>
            <li>Everyone adds movie suggestions.</li>
            <li>Vote with upvotes &amp; downvotes.</li>
            <li>Host locks and draws a random winner.</li>
            <li>Enjoy the movie!</li>
          </ol>
        </article>
      </CardContent>
      <CardFooter className="flex-col gap-5">
        <div className="flex gap-2">
          <Link href="/create">
            <Button className="cursor-pointer">Create Room</Button>
          </Link>
          <Link href="/join">
            <Button className="cursor-pointer">Join Room</Button>
          </Link>
        </div>
        <span>© 2025 RickBarretto</span>
      </CardFooter>
    </Card>
  );
}
