import { Init } from "./init.ts";
import { Setup } from "./setup.ts";
import { RenderCharacterSheet } from "./renderCharacterSheet.ts";
import { RenderExtraSheet } from "./renderExtraSheet.ts";
import { FateXRollMagic } from "./fatex.rollMagic.ts";

interface Listener {
    listen(): void;
}

const HooksFateCoreUnleashed: Listener = {
    listen(): void {
        const listeners: Listener[] = [
            Init,
            Setup,
            RenderCharacterSheet,
            RenderExtraSheet,
            FateXRollMagic,
        ];

        for (const listener of listeners) {
            listener.listen();
        }
    },
};

export { HooksFateCoreUnleashed };
export type { Listener };
