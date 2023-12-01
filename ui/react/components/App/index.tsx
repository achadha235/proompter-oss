import { Layout } from "./Layout";

export interface AppProps {
  /**
   * A greeting for the user
   */
  hello?: string;
}

export function App({ hello = "Yo" }: AppProps): React.JSX.Element {
  return (
    <Layout
      drawer={
        <div className=" ai-h-full ai-w-full ai-flex ai-justify-center ai-items-center">
          Drawer
        </div>
      }
      footer={<div>Yo</div>}
    />
  );
}
