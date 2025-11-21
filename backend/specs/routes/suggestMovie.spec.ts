import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { setupRouteTest, type RouteTest } from "src/_lib/testSupport/setupRouteTest"


describe("Suggest a movie", () => {
  let test: RouteTest
  
  beforeEach(async () => {
    test = await setupRouteTest()
  })
  
  it("should register in existent room", async () => {
    let roomCreated = await test.server.inject({
      method: "POST",
      url: "/rooms",
      payload: { username: "John Doe" }
    })
    
    let room = JSON.parse(roomCreated.body)
    const code = room.room

    const movie1Suggested = await test.server.inject({
      method: "POST",
      url: `/rooms/${code}`,
      payload: {
        username: "Jane Doe",
        title: "John Wick",
        year: 2014
      }
    })
    
    const movie1 = JSON.parse(movie1Suggested.body)
    expect(movie1Suggested.statusCode).toBe(200)
    expect(movie1).toHaveProperty("status", "ok")
    
    const movie2Suggested = await test.server.inject({
      method: "POST",
      url: `/rooms/${code}`,
      payload: {
        username: "Jane Doe",
        title: "John Wick 2",
      }
    })
    
    const movie2 = JSON.parse(movie2Suggested.body)
    expect(movie2Suggested.statusCode).toBe(200)
    expect(movie2).toHaveProperty("status", "ok")
  })
  
  it("should return Not Found non-existent room", async () => {

    const suggested = await test.server.inject({
      method: "POST",
      url: `/rooms/room-inexistent`,
      payload: {
        username: "Jane Doe",
        title: "John Wick",
        year: 2014
      }
    })
    
    const suggestion = JSON.parse(suggested.body)
    expect(suggested.statusCode).toBe(404)
    expect(suggestion).toHaveProperty("error", "Room not found")
  })
  
  it("should return error for closed room", async () => {
    const roomCreated = await test.server.inject({
      method: "POST",
      url: "/rooms",
      payload: { username: "John Doe" }
    })
    
    const roomBody = JSON.parse(roomCreated.body)
    const room = roomBody.room
    const owner = roomBody.ownerKey
    
    const closed = await test.server.inject({
      method: "POST",
      url: `/rooms/${room}/draw`,
      payload: {
        username: "John Doe",
        key: owner
      }
    })

    const suggested = await test.server.inject({
      method: "POST",
      url: `/rooms/${room}`,
      payload: {
        username: "Jane Doe",
        title: "John Wick",
        year: 2014
      }
    })
    
    const suggestion = JSON.parse(suggested.body)
    expect(suggested.statusCode).toBe(400)
    expect(suggestion).toHaveProperty("error", "Room is closed")
  })

})