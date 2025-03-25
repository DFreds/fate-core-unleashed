import { Listener } from "./index.ts";
import { handleFatePointUsed } from "../util/handle-fate-point-used.ts";
import { Settings } from "../settings.ts";

const FateXReroll: Listener = {
    listen() {
        Hooks.on("fatex.reroll", async (roll: any, data: any) => {
            const settings = new Settings();
            const shiftKey = data.shiftKey;

            if (settings.automateFatePoints && shiftKey) {
                await handleFatePointUsed(roll);
            }
        });
    },
};

export { FateXReroll };
