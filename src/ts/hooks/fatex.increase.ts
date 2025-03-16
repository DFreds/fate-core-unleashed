import { Listener } from "./index.ts";
import { handleFatePointUsed } from "../util/handle-fate-point-used.ts";

const FateXIncrease: Listener = {
    listen() {
        Hooks.on("fatex.increase", async (roll: any) => {
            await handleFatePointUsed(roll);
        });
    },
};

export { FateXIncrease };
