import { displayDialog } from "./display-dialog.ts";
import { createChatMessageToUserAndGms } from "./create-chat-message-to-user-and-gms.ts";

async function handleFatePointUsed(roll: Roll): Promise<void> {
    const actorObject = roll.options.actor as Record<string, any>;
    if (!actorObject) return;

    const actor = game.actors.get(actorObject._id);
    if (!actor) return;

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
    if (newFatePointsValue > 0) {
        message = game.i18n.format("FateCoreUnleashed.FatePointUsed", {
            actor: actor.name,
        });
    } else if (newFatePointsValue === 0) {
        message = game.i18n.format("FateCoreUnleashed.LastFatePointUsed", {
            actor: actor.name,
        });

        displayDialog({
            title: game.i18n.localize("FateCoreUnleashed.LastFatePointTitle"),
            content: `<p>${message}</p>`,
        });
    } else if (newFatePointsValue < 0) {
        message = game.i18n.format("FateCoreUnleashed.NoFatePoints", {
            actor: actor.name,
        });

        ui.notifications.error(message);
    }

    await createChatMessageToUserAndGms(message);
}

export { handleFatePointUsed };
