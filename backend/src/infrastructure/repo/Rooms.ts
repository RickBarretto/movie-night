import { MovieSuggestion, newCode, Room, RoomCode, Username } from "models.ts";

interface Repository {
  hostNew(hoster: Username): Promise<Room>
  byCode(code: RoomCode): Promise<Room | null>
  suggestMovie(suggestion: MovieSuggestion, room: RoomCode): Promise<void>
  drawWinner(room: RoomCode): Promise<MovieSuggestion>
}

export function Rooms(): Repository {
  const rooms = new Map<RoomCode, Room>()

  const hostNew = async (hoster: Username): Promise<Room> => {
    const code: RoomCode = newCode()
    const room = new Room(code, hoster)
    rooms.set(code, room)
    return room
  }

  const byCode = async (code: RoomCode): Promise<Room | null> => {
    return rooms.get(code) || null
  }

  const suggestMovie = async (suggestion: MovieSuggestion, room: RoomCode): Promise<void> => {
    const found: Room | null = await byCode(room)
    if (!found) {
      throw new Error(`Room ${found} not found`)
    } 

    found.suggestMovie(suggestion)
  }

  const drawWinner = async (room: RoomCode): Promise<MovieSuggestion> => {
    const found: Room | null = await byCode(room)
    if (!found) {
      throw new Error(`Room ${found} not found`)
    } 

    return found.drawWinner()
  }

  return {
    hostNew,
    byCode,
    suggestMovie,
    drawWinner
  };
};
