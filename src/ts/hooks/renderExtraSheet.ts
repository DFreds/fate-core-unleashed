import { Listener } from "./index.ts";
import { Settings } from "../settings.ts";
import { addRollInputToExtrasSheet } from "../ui/add-roll-input-to-extras-sheet.ts";

const RenderExtraSheet: Listener = {
    listen(): void {
        Hooks.on(
            "renderExtraSheet",
            async (sheet: any, html: any, _data: any) => {
                const itemSheet = sheet as ItemSheet<Item, any>;
                const $html = html as JQuery<HTMLElement>;

                const settings = new Settings();

                if (settings.enableExtrasRolling) {
                    await addRollInputToExtrasSheet($html, itemSheet);
                }
            },
        );
    },
};

export { RenderExtraSheet };
