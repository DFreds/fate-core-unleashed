import { Init } from "./init.ts";
import { Setup } from "./setup.ts";
import { RenderCharacterSheet } from "./renderCharacterSheet.ts";

interface Listener {
    listen(): void;
}

const HooksFateCoreUnleashed: Listener = {
    listen(): void {
        const listeners: Listener[] = [Init, Setup, RenderCharacterSheet];

        for (const listener of listeners) {
            listener.listen();
        }
    },
};

export { HooksFateCoreUnleashed };
export type { Listener };
