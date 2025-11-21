"use client"

import { useRouter } from "next/navigation";
import { useLocalStorage } from "@uidotdev/usehooks";

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
import { LucideChevronLeft } from "lucide-react";

export default function JoinPage() {
  const baseURL = "http://localhost:3000"
  const api = `${baseURL}/rooms`

  const router = useRouter();
  const [username, setUsername] = useLocalStorage("username");
  const [roomCode, setRoomCode] = useLocalStorage("roomCode");

  const joinRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roomCode = formData.get("roomCode") as string;
    const username = formData.get("username") as string;
    const response = await fetch(`${api}/${roomCode}`);
    const data = await response.json();
    console.log(data);

    setUsername(username);
    setRoomCode(data.room);

    router.push("/room");
  };

  return (
    <Card className="w-full max-w-xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Join a Room</CardTitle>
        <CardAction>
          <Link className="cursor-pointer" href="/">
            <Button className="cursor-pointer"><LucideChevronLeft/> Back</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={joinRoom} className="flex flex-col gap-2">
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
