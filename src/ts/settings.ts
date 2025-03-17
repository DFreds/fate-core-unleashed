import { MODULE_ID } from "./constants.ts";

class Settings {
    // Settings keys
    #AUTOMATE_FATE_POINTS = "automateFatePoints";
    #ENABLE_EXTRAS_ROLLING = "enableExtraRolling";
    #ENABLE_STAMINA = "enableStamina";

    register(): void {
        game.settings.register(MODULE_ID, this.#AUTOMATE_FATE_POINTS, {
            name: EN_JSON.FateCoreUnleashed.Settings.AutomateFatePoints.Name,
            hint: EN_JSON.FateCoreUnleashed.Settings.AutomateFatePoints.Hint,
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
        });

        game.settings.register(MODULE_ID, this.#ENABLE_EXTRAS_ROLLING, {
            name: EN_JSON.FateCoreUnleashed.Settings.EnableExtrasRolling.Name,
            hint: EN_JSON.FateCoreUnleashed.Settings.EnableExtrasRolling.Hint,
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
        });

        game.settings.register(MODULE_ID, this.#ENABLE_STAMINA, {
            name: EN_JSON.FateCoreUnleashed.Settings.EnableStamina.Name,
            hint: EN_JSON.FateCoreUnleashed.Settings.EnableStamina.Hint,
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
        });
    }

    get automateFatePoints(): boolean {
        return game.settings.get(
            MODULE_ID,
            this.#AUTOMATE_FATE_POINTS,
        ) as boolean;
    }

    get enableExtrasRolling(): boolean {
        return game.settings.get(
            MODULE_ID,
            this.#ENABLE_EXTRAS_ROLLING,
        ) as boolean;
    }

    get enableStamina(): boolean {
        return game.settings.get(MODULE_ID, this.#ENABLE_STAMINA) as boolean;
    }
}

export { Settings };
