import { addStaminaToHeader } from "../ui/add-stamina-to-header.ts";
import { addRollInputIconToExtra } from "../ui/add-roll-input-icon-to-extra.ts";
import { Listener } from "./index.ts";

const RenderCharacterSheet: Listener = {
    listen(): void {
        Hooks.on(
            "renderCharacterSheet",
            async (sheet: any, html: any, _data: any) => {
                const actorSheet = sheet as ActorSheet<Actor>;
                const $html = html as JQuery<HTMLElement>;

                await addStaminaToHeader($html, actorSheet);
                addRollInputIconToExtra($html, actorSheet);
            },
        );
    },
};

export { RenderCharacterSheet };
