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
        message = game.i18n.format(EN_JSON.FateCoreUnleashed.StaminaUsed, {
            actor: actor.name,
        });
    } else if (newStaminaValue === 0) {
        message = game.i18n.format(EN_JSON.FateCoreUnleashed.LastStaminaUsed, {
            actor: actor.name,
        });

        displayDialog({
            title: EN_JSON.FateCoreUnleashed.LastStaminaTitle,
            content: message,
        });
    } else if (newStaminaValue < 0) {
        message = game.i18n.format(EN_JSON.FateCoreUnleashed.NoStamina, {
            actor: actor.name,
        });

        ui.notifications.error(message);
    }

    await createChatMessageToUserAndGms(message);
}

export { handleStaminaUsed };
