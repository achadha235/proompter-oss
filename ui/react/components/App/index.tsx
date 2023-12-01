import { Layout } from "./Layout";

export interface AppProps {
  /**
   * A greeting for the user
   */
  hello?: string;
}

export function App({ hello = "Yo" }: AppProps): React.JSX.Element {
  return <Layout footer={<div>Yo</div>} />;
}
