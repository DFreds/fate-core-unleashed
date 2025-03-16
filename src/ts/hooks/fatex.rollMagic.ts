import { Listener } from "./index.ts";

const FateXRollMagic: Listener = {
    listen() {
        Hooks.on("fatex.rollMagic", async (roll: any) => {
            await handleStaminaUsed(roll);
        });
    },
};

async function handleStaminaUsed(roll: any): Promise<void> {
    const actor = roll.options.actor as Actor<any>;
    if (!actor) return;

    const system = actor.system as Record<string, any>;
    const stamina = system.stamina;

    if (!stamina) return;

    const currentStamina = stamina.current as string;
    const currentStaminaValue = parseInt(currentStamina);

    if (isNaN(currentStaminaValue)) {
        return;
    }

    const newStaminaValue = currentStaminaValue - 1;

    await actor.update({
        "system.stamina.current": newStaminaValue.toString(),
    });

    if (newStaminaValue === 0) {
        const message = game.i18n.format(
            EN_JSON.FateCoreUnleashed.StaminaUsed,
            {
                actor: actor.name,
            },
        );

        displayDialog(message);
        await sendMessageToChat(message);
    } else if (newStaminaValue < 0) {
        const message = game.i18n.format(
            EN_JSON.FateCoreUnleashed.StaminaNoStamina,
            {
                actor: actor.name,
            },
        );

        ui.notifications.error(message);
        await sendMessageToChat(message);
    }
}

function displayDialog(message: string): void {
    const dialog = new Dialog({
        title: EN_JSON.FateCoreUnleashed.Stamina,
        content: message,
        buttons: { ok: { label: EN_JSON.FateCoreUnleashed.Ok } },
    });

    dialog.render(true);
}

async function sendMessageToChat(message: string): Promise<void> {
    const gmUsers = game.users
        .filter((user) => user.isGM)
        .map((user) => user.id);

    const uniqueGmUsers = [...new Set([...gmUsers, game.userId])];

    await ChatMessage.create({
        author: game.userId,
        content: `<p>${message}</p>`,
        whisper: uniqueGmUsers,
    });
}

export { FateXRollMagic };
