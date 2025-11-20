import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function CreatePage() {
  return (
    <Card className="w-full max-w-xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Create a Room</CardTitle>
        <CardAction>
          <Link className="cursor-pointer" href="/">
            <Button className="cursor-pointer">&larr; &nbsp; Back</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-2">
          <input name="username" type="text" placeholder="Your Name" />
          <Button name="create" type="submit" className="cursor-pointer">
            Create Room
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <CardDescription>
          After creating the room, you&apos;ll receive a unique room code to
          share with your friends. As the host, you&apos;ll have control to
          finish the voting and draw the winning movie.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
