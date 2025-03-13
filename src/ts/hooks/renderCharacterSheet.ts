import { Listener } from "./index.ts";

const RenderCharacterSheet: Listener = {
    listen(): void {
        Hooks.on(
            "renderCharacterSheet",
            async (sheet: any, html: any, _data: any) => {
                const actorSheet = sheet as ActorSheet<Actor>;
                const $html = html as JQuery<HTMLElement>;

                const $fatePoints = $html.find(
                    ".fatex-header .fatex-header__fate-points",
                );

                if ($fatePoints.length > 0) {
                    const staminaTemplate = await renderTemplate(
                        "modules/fate-core-unleashed/templates/stamina-header.hbs",
                        { actor: actorSheet.actor },
                    );

                    $fatePoints.after(staminaTemplate);
                }
            },
        );
    },
};

export { RenderCharacterSheet };
