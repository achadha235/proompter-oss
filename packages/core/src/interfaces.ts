export namespace Proompter {
  export interface Adapter {}
}

export namespace Chat {
  /** An example that can be used to trigger a chat conversation */
  export interface Example {
    title: string;
    subtitle?: string;
    chatMessage: string;
  }
}
