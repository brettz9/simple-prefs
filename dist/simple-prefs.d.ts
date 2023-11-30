/**
 * Simplified factory for `SimplePrefsDefaults`
 * @param {Defaults} [defaults]
 * @returns {SimplePrefsDefaults}
 */
export function simplePrefsDefaults(defaults?: Defaults | undefined): SimplePrefsDefaults;
/**
* @typedef {{[key: string]: Value}} Defaults
*/
/**
* @typedef {boolean|number|string} Value
*/
/**
 * Preferences storage.
 */
export class SimplePrefs {
    /**
     * @param {object} cfg
     * @param {string} [cfg.namespace] Avoid clashes with other apps
     * @param {Defaults} [cfg.defaults]
     * @param {SimplePrefsDefaults} [cfg.prefDefaults]
     */
    constructor(cfg: {
        namespace?: string | undefined;
        defaults?: Defaults | undefined;
        prefDefaults?: SimplePrefsDefaults | undefined;
    });
    /** @type {((e: StorageEvent) => void)[]} */
    listeners: ((e: StorageEvent) => void)[];
    /**
     * @param {object} cfg
     * @param {string} [cfg.namespace] Avoid clashes with other apps
     * @param {Defaults} [cfg.defaults]
     * @param {SimplePrefsDefaults} [cfg.prefDefaults]
     * @returns {void}
     */
    configurePrefs({ namespace, defaults, prefDefaults }: {
        namespace?: string | undefined;
        defaults?: Defaults | undefined;
        prefDefaults?: SimplePrefsDefaults | undefined;
    }): void;
    namespace: string | undefined;
    prefDefaults: SimplePrefsDefaults | undefined;
    getPref(key: string): Promise<Value>;
    setPref(key: string, val: Value): Promise<void>;
    /**
    * @typedef {object} GetPrefSetPref
    * @property {GetPref} getPref
    * @property {SetPref} setPref
    */
    /**
     * Convenience utility to return two main methods `getPref` and
     *   `setPref` bound to the current object.
     * @returns {GetPrefSetPref}
     */
    bind(): {
        getPref: (key: string) => Promise<Value>;
        setPref: (key: string, val: Value) => Promise<void>;
    };
    /**
    * @callback PreferenceCallback
    * @param {StorageEvent} e
    * @returns {void}
    */
    /**
    * @param {string|PreferenceCallback|undefined} key
    * @param {PreferenceCallback} cb
    * @returns {PreferenceCallback}
    */
    listen(key: string | ((e: StorageEvent) => void) | undefined, cb: (e: StorageEvent) => void): (e: StorageEvent) => void;
    /**
     * @param {EventListener} listener
     * @returns {void}
     */
    unlisten(listener: EventListener): void;
}
/**
 * Defaults for SimplePrefs.
 */
export class SimplePrefsDefaults {
    /**
     *
     * @param {{defaults: Defaults}} defaults
     */
    constructor({ defaults }: {
        defaults: Defaults;
    });
    defaults: Defaults;
    /**
     * Get parsed default value for a preference.
     * @param {string} key Preference key
     * @returns {Promise<Value>}
     */
    getPrefDefault(key: string): Promise<Value>;
    /**
     * Set parsed default value for a preference.
     * @param {string} key Preference key
     * @param {Value} value
     * @returns {Promise<Value>} The old value
     */
    setPrefDefault(key: string, value: Value): Promise<Value>;
}
export type Defaults = {
    [key: string]: Value;
};
export type Value = boolean | number | string;
//# sourceMappingURL=simple-prefs.d.ts.map