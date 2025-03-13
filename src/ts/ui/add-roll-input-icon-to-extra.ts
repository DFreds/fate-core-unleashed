function addRollInputIconToExtra(
    $html: JQuery<HTMLElement>,
    actorSheet: ActorSheet<Actor>,
): void {
    const items = actorSheet.actor.items;
    const extras = items.filter((item) => item.type === "extra");

    if (extras.length === 0) {
        return;
    }

    extras
        .filter((extra) => {
            // @ts-expect-error doesn't think rollInput is defined
            const rollInput = extra.system.rollInput ?? "";
            return rollInput.length > 0;
        })
        .forEach((extra) => {
            const $chevronIcon = $html.find(
                `.fatex-js-item-collapse[data-item="${extra.id}"]`,
            );

            if ($chevronIcon.length === 0) {
                return;
            }

            const $rollInputIcon = $(
                `<i class="fatex-js-item-roll fatex-actions__icon fatex-actions__icon--no-hide fa fa-dice data-item="${extra.id}"></i>`,
            );
            $chevronIcon.before($rollInputIcon);

            $rollInputIcon.on("click", async () => {
                // @ts-expect-error doesn't think rollInput is defined
                const rollInput = extra.system.rollInput ?? "";
                // @ts-expect-error doesn't think description is defined
                const description = extra.system.description ?? "";

                if (rollInput.length === 0) {
                    return;
                }

                const rollThrough = new Roll(rollInput);
                const roll = await rollThrough.evaluate();

                const message = await roll.toMessage(
                    {
                        author: game.userId,
                        speaker: ChatMessage.getSpeaker({
                            actor: actorSheet.actor,
                        }),
                        flavor: description,
                    },
                    {
                        create: false,
                    },
                );

                ChatMessage.applyRollMode(
                    message,
                    game.settings.get("core", "rollMode"),
                );

                await ChatMessage.create(message);
            });
        });
}

export { addRollInputIconToExtra };
