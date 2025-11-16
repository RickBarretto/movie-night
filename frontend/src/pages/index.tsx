import React, { useState } from "react";


import { WelcomePage } from "./WelcomePage"
import { RoomCreation } from "./RoomCreation"
import { JoinRoom } from "./JoinRoom"
import { Room } from "./Room"

type Routes = 'home' | 'create' | 'join' | 'room'

export default function Home() {
  const [route, setRoute] = useState<Routes>('home');
  
  switch (route) {
    case 'home': return <WelcomePage/>
    case 'create': return <RoomCreation/>
    case 'join': return <JoinRoom/>
    case 'room': return <Room/>
    default: return <WelcomePage/>
  }
}
