import { Listener } from "./index.ts";
import { handleFatePointUsed } from "../util/handle-fate-point-used.ts";

const FateXReroll: Listener = {
    listen() {
        Hooks.on("fatex.reroll", async (roll: any) => {
            await handleFatePointUsed(roll);
        });
    },
};

export { FateXReroll };
