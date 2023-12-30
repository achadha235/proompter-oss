import { Runner } from "@proompter/core";
import { run } from "./src/run";
import { FlowiseInput } from "./src/FlowiseRunArgs";

const runner: Runner<FlowiseInput> = {
  run,
};

export default runner;
