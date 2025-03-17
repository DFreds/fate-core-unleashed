import { Listener } from "./index.ts";
import { handleStaminaUsed } from "../util/handle-stamina-used.ts";
import { Settings } from "../settings.ts";

const FateXRollMagic: Listener = {
    listen() {
        Hooks.on("fatex.rollMagic", async (roll: any) => {
            const settings = new Settings();

            if (settings.enableStamina) {
                await handleStaminaUsed(roll);
            }
        });
    },
};

export { FateXRollMagic };
