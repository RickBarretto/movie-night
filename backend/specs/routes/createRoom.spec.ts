import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { setupRouteTest, type RouteTest } from "src/_lib/testSupport/setupRouteTest"


describe("Successfully create a room", () => {
  let test: RouteTest
  
  beforeEach(async () => {
    test = await setupRouteTest()
  })
  
  it("should create a room", async () => {
    const response = await test.server.inject({
      method: "POST",
      url: "/rooms",
      payload: { username: "John Doe" }
    })
    
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(201)
    expect(body).toHaveProperty("status", "created")
    expect(body).toHaveProperty("room")
    expect(body).toHaveProperty("ownerKey")
  })
})