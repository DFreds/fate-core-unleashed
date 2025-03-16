import { displayDialog } from "./display-dialog.ts";
import { createChatMessageToUserAndGms } from "./create-chat-message-to-user-and-gms.ts";

async function handleFatePointUsed(roll: Roll): Promise<void> {
    const actor = roll.options.actor as Actor<any>;
    if (!actor) return;

    if (!(actor instanceof Actor)) return;

    const system = actor.system as Record<string, any>;
    const fatePoints = system.fatepoints;

    if (!fatePoints) return;

    const currentFatePoints = fatePoints.current as string;
    const currentFatePointsValue = parseInt(currentFatePoints);

    if (isNaN(currentFatePointsValue)) return;

    const newFatePointsValue = currentFatePointsValue - 1;

    await actor.update({
        "system.fatepoints.current": newFatePointsValue.toString(),
    });

    let message = "";
    if (newFatePointsValue >= 0) {
        message = game.i18n.format(EN_JSON.FateCoreUnleashed.FatePointUsed, {
            actor: actor.name,
        });
    } else if (newFatePointsValue === 0) {
        message = game.i18n.format(
            EN_JSON.FateCoreUnleashed.LastFatePointUsed,
            {
                actor: actor.name,
            },
        );

        displayDialog({
            title: EN_JSON.FateCoreUnleashed.LastFatePointTitle,
            content: message,
        });
    } else if (newFatePointsValue < 0) {
        message = game.i18n.format(EN_JSON.FateCoreUnleashed.NoFatePoints, {
            actor: actor.name,
        });

        ui.notifications.error(message);
    }

    await createChatMessageToUserAndGms(message);
}

export { handleFatePointUsed };
