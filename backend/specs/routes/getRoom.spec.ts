import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { setupRouteTest, type RouteTest } from "src/_lib/testSupport/setupRouteTest"


describe("Get Room information", () => {
  let test: RouteTest
  
  beforeEach(async () => {
    test = await setupRouteTest()
  })
  
  it("should return information about existent room", async () => {
    const roomCreated = await test.server.inject({
      method: "POST",
      url: "/rooms",
      payload: { username: "John Doe" }
    })
    
    const roomBody = JSON.parse(roomCreated.body)
    const room = roomBody.room
    const owner = roomBody.ownerKey
    
    await test.server.inject({
      method: "POST",
      url: `/rooms/${room}`,
      payload: {
        username: "Jane Doe",
        title: "John Wick",
        year: 2014
      }
    })
    
    await test.server.inject({
      method: "POST",
      url: `/rooms/${room}/draw`,
      payload: {
        username: "John Doe",
        key: owner
      }
    })
    
    const found = await test.server.inject({
      method: "GET",
      url: `/rooms/${room}`
    })
    
    const foundBody = JSON.parse(found.body)
    expect(found.statusCode).toBe(200)
    expect(foundBody).toHaveProperty("status", "ok")
    expect(foundBody).toHaveProperty("room", room)
    expect(foundBody).toHaveProperty("state", "closed")
    expect(foundBody).toHaveProperty("movies")
    expect(foundBody).toHaveProperty("winner")

    expect(foundBody.winner).toHaveProperty("id")
    expect(foundBody.winner).toHaveProperty("title", "John Wick")
    expect(foundBody.winner).toHaveProperty("year", 2014)
    expect(foundBody.winner).toHaveProperty("by", "Jane Doe")
 
    expect(foundBody.movies[0]).toHaveProperty("id")
    expect(foundBody.movies[0]).toHaveProperty("title", "John Wick")
    expect(foundBody.movies[0]).toHaveProperty("year", 2014)
    expect(foundBody.movies[0]).toHaveProperty("by", "Jane Doe")
  })
  
  it("should return Not Found for non-existent room", async () => {
    
    const found = await test.server.inject({
      method: "GET",
      url: "/rooms/room-inexistent"
    })
    
    const foundBody = JSON.parse(found.body)
    expect(found.statusCode).toBe(404)
    expect(foundBody).toHaveProperty("error", "Room not found")
  })

})