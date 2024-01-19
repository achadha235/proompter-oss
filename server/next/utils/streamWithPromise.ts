"use server";
/**
 * Helper to couple a readable stream with a promise
 * The new resulting stream will close once the original stream is closed AND the promise is resolved
 * This is useful when you have an ephemeral cloud fn that will terminate as soon as the HTTP stream is closed
 * It allows you to (1) quickly return an event stream to the client and then (2) do some cleanup after the original stream is closed before closing the transformed stream
 * @param stream
 * @param promise
 * @returns
 */

export async function streamWithPromise(
  stream: ReadableStream<any>,
  promise: Promise<any>
) {
  const transformStream = new TransformStream();

  const pipeComplete = stream.pipeTo(transformStream.writable, {
    preventClose: true,
  });

  Promise.all([pipeComplete, promise]).then(() => {
    // Close the transform stream once the original stream is closed AND the promise is resolved
    transformStream.writable.close();
  });

  return transformStream;
}
