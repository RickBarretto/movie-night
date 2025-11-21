import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { setupRouteTest, type RouteTest } from "src/_lib/testSupport/setupRouteTest"


describe("Draw a winner", () => {
  let test: RouteTest
  
  beforeEach(async () => {
    test = await setupRouteTest()
  })
  
  it("should draw for valid credentials", async () => {
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
    
    const closed = await test.server.inject({
      method: "POST",
      url: `/rooms/${room}/draw`,
      payload: {
        username: "John Doe",
        key: owner
      }
    })
    
    const closedBody = JSON.parse(closed.body)
    expect(closed.statusCode).toBe(200)
    expect(closedBody).toHaveProperty("status", "ok")
    expect(closedBody).toHaveProperty("winner")

    expect(closedBody.winner).toHaveProperty("id")
    expect(closedBody.winner).toHaveProperty("title", "John Wick")
    expect(closedBody.winner).toHaveProperty("year", 2014)
    expect(closedBody.winner).toHaveProperty("by", "Jane Doe")
  })
  
  it("should return Not Found for non-existent room", async () => {
    
    const closed = await test.server.inject({
      method: "POST",
      url: `/rooms/room-inexistent/draw`,
      payload: {
        username: "John Doe",
        key: "some"
      }
    })
    
    const closedBody = JSON.parse(closed.body)
    expect(closed.statusCode).toBe(404)
    expect(closedBody).toHaveProperty("error", "Room not found")
  })
  
  it("should have valid credentials", async () => {
    const roomCreated = await test.server.inject({
      method: "POST",
      url: "/rooms",
      payload: { username: "John Doe" }
    })
    
    const roomBody = JSON.parse(roomCreated.body)
    const room = roomBody.room
    const owner = roomBody.ownerKey
    
    const wrongUser = await test.server.inject({
      method: "POST",
      url: `/rooms/${room}/draw`,
      payload: {
        username: "Jane Doe",
        key: owner
      }
    })
    
    const wrongUserBody = JSON.parse(wrongUser.body)
    expect(wrongUser.statusCode).toBe(403)
    expect(wrongUserBody).toHaveProperty("error", "Unauthorized")
    
    const wrongKey = await test.server.inject({
      method: "POST",
      url: `/rooms/${room}/draw`,
      payload: {
        username: "John Doe",
        key: "invalid"
      }
    })
    
    const wrongKeyBody = JSON.parse(wrongKey.body)
    expect(wrongKey.statusCode).toBe(403)
    expect(wrongKeyBody).toHaveProperty("error", "Unauthorized")
  })
  
  it("should draw only for open rooms", async () => {
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
      url: `/rooms/${room}/draw`,
      payload: {
        username: "John Doe",
        key: owner
      }
    })
    
    const closed = await test.server.inject({
      method: "POST",
      url: `/rooms/${room}/draw`,
      payload: {
        username: "John Doe",
        key: owner
      }
    })
    
    const closedBody = JSON.parse(closed.body)
    expect(closed.statusCode).toBe(400)
    expect(closedBody).toHaveProperty("error", "Room is closed")
  })

})