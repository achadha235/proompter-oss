import { useProompter } from "@/hooks/useProompter";
import { Layout } from "./Layout";
import { Header } from "..";
import { Footer } from "../Footer";

export interface AppProps {
  /**
   * A greeting for the user
   */
  hello?: string;
}

export function App({ hello = "Yo" }: AppProps): React.JSX.Element {
  const { user, config } = useProompter();
  return (
    <Layout
      header={<Header />}
      footer={<Footer />}
      main={<div>Yo main</div>}
      drawer={
        <div className=" ai-h-full ai-w-full ai-flex ai-justify-center ai-items-center">
          Drawer
        </div>
      }
    />
  );
}
