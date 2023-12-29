export function FlowiseSocketStream() {
  const stream = new TransformStream();
  let streamWriter: WritableStreamDefaultWriter;
  return {
    stream,
    to: (_socketId: string) => {
      return {
        emit: (eventName: string, payload: any) => {
          if (eventName === "start") {
            // Create a writer for the stream
            streamWriter = stream.writable.getWriter();
          } else if (eventName === "end") {
            if (!streamWriter) {
              throw new Error("Stream not started");
            }
            // Close the writer
            streamWriter.close();
          } else if (["token", "sourceDocuments"].includes(eventName)) {
            if (!streamWriter) {
              throw new Error("Stream not started");
            }
            // Write the payload to the stream for a token / sourceDocuments event
            streamWriter.write(payload);
          }
        },
      };
    },
  };
}
