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

            if (isNaN(currentStaminaValue)) {
                return;
            }

            if (currentStaminaValue <= 0) {
                ui.notifications.warn("You don't have any stamina left!");
                return;
            }

            await actor.update({
                "system.stamina.current": (currentStaminaValue - 1).toString(),
            });
        });
    },
};

export { FateXRollMagic };
