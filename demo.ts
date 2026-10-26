import { run } from "./agent.ts";
import { guard } from "./guard.ts";
run("NAIVE AGENT");
run("WITH OUTBOUND GUARD", guard);
