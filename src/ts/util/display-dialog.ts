import { Dialog } from "@client/appv1/api/_module.mjs";

function displayDialog({
    title,
    content,
}: {
    title: string;
    content: string;
}): void {
    const dialog = new Dialog({
        title,
        content,
        buttons: { ok: { label: game.i18n.localize("FateCoreUnleashed.Ok") } },
    });

    dialog.render(true);
}

export { displayDialog };
