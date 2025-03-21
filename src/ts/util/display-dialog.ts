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
        buttons: { ok: { label: "FateCoreUnleashed.Ok" } },
    });

    dialog.render(true);
}

export { displayDialog };
