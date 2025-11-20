import Link from 'next/link';

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function JoinPage() {
  return (
    <Card className="w-full max-w-xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Join a Room</CardTitle>
        <CardAction>
          <Link className="cursor-pointer" href="/">
            <Button className="cursor-pointer">&larr; &nbsp; Back</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-2">
          <Label htmlFor="roomCode">Room Code</Label>
          <Input name="roomCode" type="text" placeholder="CODE123" />
          <Label htmlFor="username">Your Name</Label>
          <Input name="username" type="text" placeholder="Jane Doe" />
          <Button name="join" type="submit" className="cursor-pointer">
            Join Room
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Don&apos;t have a room? <Link href="/create" className='underline'>Create one</Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
