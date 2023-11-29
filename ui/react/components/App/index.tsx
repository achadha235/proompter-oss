export interface AppProps {
  /**
   * A greeting for the user
   */
  hello?: string;
}

export function App({ hello = "Yo" }: AppProps) {
  return (
    <div className="ai-flex ai-justify-center ai-items-center ai-w-screen ai-h-screen ai-bg-red-200">
      Yo
    </div>
  );
}
