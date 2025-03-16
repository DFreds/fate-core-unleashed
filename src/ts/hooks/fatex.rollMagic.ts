import { Listener } from "./index.ts";
import { handleStaminaUsed } from "../util/handle-stamina-used.ts";

const FateXRollMagic: Listener = {
    listen() {
        Hooks.on("fatex.rollMagic", async (roll: any) => {
            await handleStaminaUsed(roll);
        });
    },
};

export { FateXRollMagic };
