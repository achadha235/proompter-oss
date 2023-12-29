import { describe, expect, test } from "bun:test";
import { FlowiseSocketStream } from "./FlowiseSocketStream";

describe("FlowiseSocketStream", () => {
  test("should be instantiated", () => {
    const socketStream = FlowiseSocketStream();
    expect(socketStream).toBeDefined();
  });

  test("should expose a stream", () => {
    const socketStream = FlowiseSocketStream();
    expect(socketStream.stream).toBeDefined();
  });

  test("should emulate a socket and handle start, token and sourceDocuments events", async () => {
    const socketStream = FlowiseSocketStream();

    expect(socketStream.to).toBeFunction();

    const streamer = socketStream.to("socketId");

    // Starts the stream
    let testPayload = "test-payload";
    streamer.emit("start", undefined);
    streamer.emit("token", testPayload);

    const reader = socketStream.stream.readable.getReader();

    expect(reader).toBeDefined();

    // Token
    let result = await reader.read();
    expect(result.value).toBe(testPayload);
    // Source documents
    testPayload = "test-sourcedocs-payload";
    streamer.emit("sourceDocuments", testPayload);
    result = await reader.read();
    expect(result.value).toBe(testPayload);
  });

  test("should throw an error if stream is not started ", async () => {
    const socketStream = FlowiseSocketStream();

    expect(socketStream.to).toBeFunction();

    const streamer = socketStream.to("socketId");

    // Starts the stream
    let testPayload = "test-payload";
    expect(() => {
      streamer.emit("token", testPayload);
    }).toThrow("Stream not started");

    expect(() => {
      streamer.emit("sourceDocuments", testPayload);
    }).toThrow("Stream not started");
  });

  test("should close the stream after end event", async () => {
    const socketStream = FlowiseSocketStream();

    expect(socketStream.to).toBeFunction();

    const streamer = socketStream.to("socketId");

    // Starts the stream
    streamer.emit("start", undefined);
    streamer.emit("token", "test-payload");

    const reader = socketStream.stream.readable.getReader();
    await reader.read();
    streamer.emit("end", null);
    expect(reader.closed).resolves.toBeUndefined();
  });
});
