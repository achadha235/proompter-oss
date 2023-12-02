import { useContext } from "react";
import { ConfigContext } from "..";

export function useProompter() {
  return useContext(ConfigContext);
}
