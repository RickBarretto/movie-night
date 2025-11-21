"use client"

import React from "react";

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


export default function RoomPage() {
  const { user, room } = useSession();
  const [commandOpen, setCommandOpen] = React.useState<boolean>(false);

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

  return (
    <div className="flex flex-col flex-center gap-4 max-w-4xl mx-auto p-16">
      <Card>
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2">
            <LucideFilm />
            Night Movie Room
          </CardTitle>
          <CardAction className="flex align-middle gap-4">
            <Badge>
              {
               (room.status == "open")? <LucideLockKeyholeOpen/> : <LucideLockKeyhole/>
              }
              {room.status.toUpperCase()}
            </Badge>
            <div className="inline-flex items-center gap-2 font-mono text-sm">
              <span>{room.code}</span>
              <CopyButton content={room.code} />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button>
            <LucideContact /> {user.name}
          </Button>
          <Badge variant="outline">{user.role.toUpperCase()}</Badge>
        </CardContent>
        {user.role === "host" && (
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
              <form>
                <DialogTrigger asChild>
                  <Button><LucidePlus/> Suggest New</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Suggest a Movie</DialogTitle>
                    <DialogDescription>
                      Enter the title of the movie you&apos;d like to suggest.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-4 gap-4 py-4 [&>input]:col-span-3">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="John Wick" required />
                    <Label htmlFor="year">Year (Optional)</Label>
                    <Input id="year" placeholder="2014" type="number" />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Suggest</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <MovieCard title="John Wick" year={2014} by="Jane Doe" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>

      <CommandDialog
        open={user.role === "host" && commandOpen}
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
        <CardTitle>{ title } ({ year })</CardTitle>
        <CardDescription className="flex items-center">
          <LucideUserRoundCheck className="mr-1 h-4 w-4" />
          <span>{ by }</span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}


// Internal Hooks

interface User {
  name: string;
  role: "host" | "guest";
}

interface Room {
  code: string;
  status: "open" | "closed";
}

interface Session {
  user: User;
  room: Room;
}

function useSession(): Session {
  return {
    user: {
      name: "John Doe",
      role: "host",
    },
    room: {
      code: "ABC123",
      status: "open",
    },
  };
}
