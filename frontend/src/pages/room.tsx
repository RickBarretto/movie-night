import React from "react"

import { useHost, useUsername } from "@/hooks/useUser"
import { useRoom } from "@/hooks/useRoom"

import { Card } from "@/components/Card"
import { Button } from "@/components/ui/button"


export default function RoomPage() {
  const { user, room } = useSession()

  return (
    <div className="flex flex-col flex-center w-screen h-screen p-16">
      <Card className="max-w-md">
        <h2>🎬 Movie Night Room</h2>
        <UserInfo user={user}/>
        <ShareSection room={room}/>
      </Card>
    </div>
  )
}


// Internal Hooks

interface User {
  name: string
  role: 'host' | 'guest'
}

interface Room {
  code: string
  status: 'open' | 'closed'
}

interface Session {
  user: User
  room: Room
}

function useSession(): Session {
  return {
    user: {
      name: 'John Doe',
      role: 'host'
    },
    room: {
      code: 'ABC123',
      status: 'open'
    }
  }
}

// Internal Components
 
function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex justify-start align-center my-2 gap-4">
      <span className="my-auto">👨 {user.name}</span>
      <Button>{user.role}</Button>
    </div>
  )
}

function ShareSection({ room }: { room: Room }) {
  return (
    <div className="flex flex-col gap-2">
      <p>Share this Code:</p>
      <div className="flex justify-between align-center">
        <div className="flex justify-center align-center my-auto gap-4">
          <Button
            className="cursor-pointer"
            onClick={() => navigator.clipboard.writeText(room.code)}
          >
            Copy Code
          </Button>
          <Button>{ room.code }</Button>
        </div>
        <Button>🔐 { room.status }</Button>
      </div>
    </div>
  )
}
