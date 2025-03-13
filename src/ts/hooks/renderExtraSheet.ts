import { Listener } from "./index.ts";

const RenderExtraSheet: Listener = {
    listen(): void {
        Hooks.on(
            "renderExtraSheet",
            async (sheet: any, html: any, _data: any) => {
                const itemSheet = sheet as ItemSheet<Item, any>;
                const $html = html as JQuery<HTMLElement>;

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
            },
        );
    },
};

export { RenderExtraSheet };
