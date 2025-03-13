async function addStaminaToHeader(
    $html: JQuery<HTMLElement>,
    actorSheet: ActorSheet<Actor>,
): Promise<void> {
    const $fatePoints = $html.find(".fatex-header .fatex-header__fate-points");

    if ($fatePoints.length === 0) {
        return;
    }

    const staminaTemplate = await renderTemplate(
        "modules/fate-core-unleashed/templates/stamina-header.hbs",
        { actor: actorSheet.actor },
    );

    $fatePoints.after(staminaTemplate);
}

export { addStaminaToHeader };
