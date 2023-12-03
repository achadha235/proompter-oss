import { Config } from "@proompter/core";
import { useState } from "react";
import { first } from "lodash";

export function useProompter(intialConfig: Config) {
  const [config, setConfig] = useState(intialConfig);
  const [chatflow, setChatflow] = useState(first(config.chatflows)!);

  return {
    config,
    setConfig,
    chatflow,
    setChatflow,
  };
}
