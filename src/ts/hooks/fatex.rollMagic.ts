import { Listener } from "./index.ts";

const FateXRollMagic: Listener = {
    listen() {
        Hooks.on("fatex.rollMagic", async (roll: any) => {
            const actor = roll.options.actor;
            if (!actor) return;

            const stamina = actor.system.stamina;
            if (!stamina) return;

            const currentStamina = stamina.current as string;
            const currentStaminaValue = parseInt(currentStamina);

            if (isNaN(currentStaminaValue) || currentStaminaValue <= 0) {
                return;
            }

            await actor.update({
                "system.stamina.current": (currentStaminaValue - 1).toString(),
            });
        });
    },
};

export { FateXRollMagic };
