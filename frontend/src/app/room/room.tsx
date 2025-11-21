"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Badge } from "@/components/ui/badge";
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
import {
    CommandDialog,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/ui/shadcn-io/copy-button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    LucideContact,
    LucideFilm,
    LucideFlag,
    LucideList,
    LucideLockKeyhole,
    LucideLockKeyholeOpen,
    LucidePlus,
    LucideUserRoundCheck
} from "lucide-react";


export function RoomPage() {
  const baseURL = "http://localhost:3000"
  
  const [hydrated, setHydrated] = React.useState(false);

  const [username, setUsername] = useLocalStorage("username", "");
  const [ownerKey, setOwnerKey] = useLocalStorage("ownerKey", "");
  const [roomCode, setRoomCode] = useLocalStorage("roomCode", "");

  const { room, refresh, isHost, isOpen, userRole } =
    useRoom(baseURL, { username, ownerKey, room: roomCode });

  const [commandOpen, setCommandOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommandOpen((isCommandOpen) => !isCommandOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!hydrated) {
    return <div className="p-16">Loading…</div>;
  }
  
  const suggest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
  
    let year: number | null = null;
    const rawYear = formData.get("year");
  
    if (rawYear) {
      const parsed = Number.parseInt(rawYear as string);
      year = (Number.isNaN(parsed))? null : parsed;
    }
  
    const response = await fetch(`${baseURL}/rooms/${roomCode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, title, year }),
    });
  
    const data = await response.json();
    console.log("[SUGGESTED]", data);
    await refresh();
  };


  return (
    <div className="flex flex-col flex-center gap-4 max-w-4xl mx-auto p-16">
      <Card>
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2">
            <LucideFilm />
            Night Movie Room
          </CardTitle>
          <CardAction className="flex align-middle gap-4">
            {room && (
              <Badge>
                {isOpen ? <LucideLockKeyholeOpen /> : <LucideLockKeyhole />}
                {room.status.toUpperCase()}
              </Badge>
            )}
            <div className="inline-flex items-center gap-2 font-mono text-sm">
              <span>{roomCode}</span>
              <CopyButton content={roomCode} />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button>
            <LucideContact /> {username}
          </Button>
          <Badge variant="outline">{userRole.toUpperCase()}</Badge>
        </CardContent>
        {isHost && (
          <CardFooter>
            <p>
              Press&nbsp;
              <KbdGroup>
                <Kbd>⌘</Kbd>+<Kbd>K</Kbd>
              </KbdGroup>
              &nbsp;to open the Host Command Panel.
            </p>
          </CardFooter>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2">
            <LucideList /> Suggestions
          </CardTitle>

          <CardAction>
            <Dialog>
              <DialogTrigger asChild>
                <Button><LucidePlus/> Suggest New</Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={suggest}>
                  <DialogHeader>
                    <DialogTitle>Suggest a Movie</DialogTitle>
                    <DialogDescription>
                      Enter the movie you want to suggest.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-4 gap-4 py-4">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" className="col-span-3" placeholder="John Wick" required />
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" name="year" className="col-span-3" placeholder="2014" type="number" />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Suggest</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardAction>

        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {!room && (
            <>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </>
          )}
          {room && room.movies.length === 0 && (
            <p className="text-sm text-muted-foreground">No suggestions yet.</p>
          )}
          {room &&
            room.movies.map((movie) => (
              <MovieCard key={movie.id} title={movie.title} year={movie.year} by={movie.by}/>
          ))}
        </CardContent>
      </Card>

      <CommandDialog
        open={isHost && commandOpen}
        onOpenChange={setCommandOpen}
      >
        <CommandList>
          <CommandGroup heading="Host Commands">
            <CommandItem>
              <LucideFlag className="mr-2 h-4 w-4" />
              Finish &amp; Draw Winner
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

// Internal Components

const MovieCard = ({ title, year, by }) => {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle>{ title } { (year)? `(${year})` : '' }</CardTitle>
        <CardDescription className="flex items-center">
          <LucideUserRoundCheck className="mr-1 h-4 w-4" />
          <span>{ by }</span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}


// Internal Hooks

interface Movie {
  id: string;
  title: string;
  by: string;
  year: number | null;
}

interface Room {
  code: string
  host: string
  status: "open" | "closed"
  movies: Movie[]
  winner: Movie | null
}

interface Session {
  username: string
  room: string
  ownerKey: string
}

const useRoom = (api: string, session: Session) => {
  const [room, setRoom] = React.useState<Room | null>(null);

  const refresh = async () => {
    const response = await fetch(`${api}/rooms/${session.room}`);
    const data = await response.json();

    setRoom({
      code: data.code,
      host: data.host,
      status: data.state,
      movies: data.movies,
      winner: data.winner,
    });
  };

  const isHost = room?.host === session.username;
  const isOpen = room?.status === "open";
  const userRole = isHost ? "host" : "guest";

  React.useEffect(() => {
    refresh();
  }, []);

  React.useEffect(() => {
    console.log("[REFRESHED]", room)
  }, [room]);

  return { room, refresh, isHost, isOpen, userRole };
};

