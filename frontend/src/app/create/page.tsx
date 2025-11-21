"use client"

import { useRouter } from "next/navigation";
import { useLocalStorage } from "@uidotdev/usehooks";

import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideChevronLeft } from "lucide-react";


export default function Page() {
  const baseURL = "http://localhost:3000"
  const api = `${baseURL}/rooms`

  const router = useRouter();
  const [username, setUsername] = useLocalStorage("username");
  const [ownerKey, setOwnerKey] = useLocalStorage("ownerKey");
  const [roomCode, setRoomCode] = useLocalStorage("roomCode");

  const hostRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    console.log(data);

    setUsername(username);
    setOwnerKey(data.ownerKey);
    setRoomCode(data.room);

    router.push("/room");
  };

  return (
    <Card className="w-full max-w-xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Create a Room</CardTitle>
        <CardAction>
          <Link className="cursor-pointer" href="/">
            <Button className="cursor-pointer"><LucideChevronLeft/> Back</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={hostRoom} className="flex flex-col gap-2">
          <Label htmlFor="username">Your Name</Label>
          <Input name="username" type="text" placeholder="John Doe" />
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
