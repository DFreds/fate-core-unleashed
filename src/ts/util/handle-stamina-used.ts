import { displayDialog } from "./display-dialog.ts";
import { createChatMessageToUserAndGms } from "./create-chat-message-to-user-and-gms.ts";

async function handleStaminaUsed(roll: Roll): Promise<void> {
    const actor = roll.options.actor as Actor<any>;
    if (!actor) return;

    if (!(actor instanceof Actor)) return;

    const system = actor.system as Record<string, any>;
    const stamina = system.stamina;

    if (!stamina) return;

    const currentStamina = stamina.current as string;
    const currentStaminaValue = parseInt(currentStamina);

    if (isNaN(currentStaminaValue)) return;

    const newStaminaValue = currentStaminaValue - 1;

    await actor.update({
        "system.stamina.current": newStaminaValue.toString(),
    });

    let message = "";
    if (newStaminaValue > 0) {
        message = game.i18n.format("FateCoreUnleashed.StaminaUsed", {
            actor: actor.name,
        });
    } else if (newStaminaValue === 0) {
        message = game.i18n.format("FateCoreUnleashed.LastStaminaUsed", {
            actor: actor.name,
        });

        displayDialog({
            title: game.i18n.localize("FateCoreUnleashed.LastStaminaTitle"),
            content: `<p>${message}</p>`,
        });
    } else if (newStaminaValue < 0) {
        message = game.i18n.format("FateCoreUnleashed.NoStamina", {
            actor: actor.name,
        });

        ui.notifications.error(message);
    }

    await createChatMessageToUserAndGms(message);
}

export { handleStaminaUsed };
