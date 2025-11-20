import React from "react"

import { useHost, useUsername } from "@/hooks/useUser"
import { useRoom } from "@/hooks/useRoom"



export default function RoomPage() {
  const { user, isHost, room } = useSession()

  return (
    <div className="flex flex-center h-screen">
      <div>Username: {user} {isHost ? "Host" : "Guest"} ({room})</div>
    </div>
  )
}


interface Session {
  user: string;
  isHost: boolean;
  room: string;
}

function useSession(): Session {
  const { name } = useUsername()
  const { isHost } = useHost()
  const { room } = useRoom()
  
  return {
    user: name,
    isHost: isHost,
    room: room
  }
}