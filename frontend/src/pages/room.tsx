import React from "react";

import { useHost, useUsername } from "@/hooks/useUser";
import { useRoom } from "@/hooks/useRoom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LucideContact,
  LucideFilm,
  LucideFlag,
  LucideList,
} from "lucide-react";
import { CopyButton } from "@/components/ui/shadcn-io/copy-button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
            <Button variant="secondary">{room.status.toUpperCase()}</Button>
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
          <Button>{user.role.toUpperCase()}</Button>
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
            <LucideList />
            Movie List
          </CardTitle>
        </CardHeader>
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
