import React from 'react';


interface RoomHook {
  room: string
  createRoom: () => void
  joinRoom: (room: string) => void
}

export function useRoom(): RoomHook {
  const [room, setRoom] = React.useState<string>('')

  React.useEffect(() => {
    // Retrieve room from localStorage
    const room = localStorage.getItem('room')
    if (room) setRoom(room)
  }, [])
  
  React.useEffect(() => {
    // Also sets room in localStorage
    localStorage.setItem('room', room)
  }, [room])
  
  const createRoom = () => {
    const newRoom = Math.random()
      .toString(36)
      .substring(2, 15)
    
    setRoom(newRoom)
  }
  
  const joinRoom = (room: string) => {
    setRoom(room)
  }

  return { room, createRoom, joinRoom }
}