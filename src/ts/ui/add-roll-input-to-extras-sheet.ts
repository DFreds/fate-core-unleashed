async function addRollInputToExtrasSheet(
    $html: JQuery<HTMLElement>,
    itemSheet: ItemSheet<Item, any>,
): Promise<void> {
    const $descriptionLabel = $html.find(
        "label[for='system.shortDescription']",
    );

    if ($descriptionLabel.length > 0) {
        const rollInputTemplate = await renderTemplate(
            "modules/fate-core-unleashed/templates/extra-sheet-roll-input.hbs",
            { system: itemSheet.item.system },
        );

        $descriptionLabel.parent().after(rollInputTemplate);
    }
}

export { addRollInputToExtrasSheet };
