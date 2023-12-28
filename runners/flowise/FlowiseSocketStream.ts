export interface PredictionEvent {
  eventName: string;
  payload: any;
}

export function FlowiseSocketStream() {
  const stream = new TransformStream();
  let streamWriter: WritableStreamDefaultWriter;
  return {
    stream,
    to: (_socketId: string) => {
      return {
        emit: (eventName: string, payload: any) => {
          if (eventName === "start") {
            streamWriter = stream.writable.getWriter();
          } else if (eventName === "end") {
            streamWriter.close();
          } else if (["token", "sourceDocuments"].includes(eventName)) {
            streamWriter.write(payload);
          }
        },
      };
    },
  };
}
