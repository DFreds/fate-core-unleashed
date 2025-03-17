import { Listener } from "./index.ts";
import { handleFatePointUsed } from "../util/handle-fate-point-used.ts";
import { Settings } from "../settings.ts";

const FateXIncrease: Listener = {
    listen() {
        Hooks.on("fatex.increase", async (roll: any) => {
            const settings = new Settings();

            if (settings.automateFatePoints) {
                await handleFatePointUsed(roll);
            }
        });
    },
};

export { FateXIncrease };
