/**
 * @typedef {{[key: string]: JSONValue}} Defaults
 */

/**
 * @typedef {null|boolean|number|string} JSONPrimitive
 */
/**
 * @typedef {JSONValue[]} JSONArray
 */
/**
 * @typedef {JSONPrimitive | JSONArray | {
 *   [key in string]: JSONValue
 * }} JSONValue
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
  constructor (cfg) {
    this.configurePrefs(cfg);

    /** @type {((e: StorageEvent) => void)[]} */
    this.listeners = [];
  }
  /**
   * @param {object} cfg
   * @param {string} [cfg.namespace] Avoid clashes with other apps
   * @param {Defaults} [cfg.defaults]
   * @param {SimplePrefsDefaults} [cfg.prefDefaults]
   * @returns {void}
   */
  configurePrefs ({
    namespace, defaults, prefDefaults = simplePrefsDefaults(defaults)
  }) {
    this.namespace = namespace ?? '';
    this.prefDefaults = prefDefaults;
  }
  /**
   * Get parsed preference value; returns `Promise` in anticipation
   * of https://domenic.github.io/async-local-storage/ .
   * @callback GetPref
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @returns {Promise<JSONValue>} Resolves to the parsed
   *   value (defaulting if necessary)
   */

  /** @type {GetPref} */
  async getPref (key) {
    const result = localStorage.getItem(this.namespace + key);
    return result === null
      ? await /** @type {SimplePrefsDefaults} */ (
        this.prefDefaults
      ).getPrefDefault(key)
      : JSON.parse(result);
  }
  /**
   * Set a stringifiable preference value; returns `Promise` in anticipation
   *   of https://domenic.github.io/async-local-storage/ .
   * @callback SetPref
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @param {JSONValue} val Stringifiable value
   * @returns {Promise<void>} Resolves after setting the item (Not currently
   *    in use)
   */

  /** @type {SetPref} */
  async setPref (key, val) {
    return await localStorage.setItem(
      this.namespace + key, JSON.stringify(val)
    );
  }

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
  bind () {
    return {
      getPref: this.getPref.bind(this),
      setPref: this.setPref.bind(this)
    };
  }

  /**
  * @callback PreferenceCallback
  * @param {StorageEvent} e
  * @returns {void}
  */

  /* eslint-disable promise/prefer-await-to-callbacks -- Repeating event */
  /**
  * @param {string|PreferenceCallback|undefined} key
  * @param {PreferenceCallback} cb
  * @returns {PreferenceCallback}
  */
  listen (key, cb) {
    if (typeof key === 'function') {
      cb = key;
      key = undefined;
    }

    /**
     * @param {StorageEvent} e
     */
    const listener = (e) => {
      if (e.key === null) { // `null` for clear browser action or user `clear()`
        if (key === undefined) { // Only trigger when no key supplied
          return;
        }
      } else {
        if (!e.key.startsWith(/** @type {string} */ (this.namespace))) {
          return;
        }
        if (key !== undefined && !e.key.startsWith(
          /** @type {string} */ (this.namespace) + key
        )) {
          return;
        }
      }

      cb(e);
    };

    globalThis.addEventListener('storage', listener);

    this.listeners.push(listener);

    return listener;
  }

  /**
   * @param {EventListener} listener
   * @returns {void}
   */
  unlisten (listener) {
    if (listener) {
      for (let i = 0; i < this.listeners.length; i++) {
        if (listener === this.listeners[i]) {
          this.listeners.splice(i, 1);
          globalThis.removeEventListener('storage', listener);
          return;
        }
      }
    }
    this.listeners.forEach((listenerItem) => {
      globalThis.removeEventListener('storage', listenerItem);
    });
  }
  /* eslint-enable promise/prefer-await-to-callbacks -- Repeating event */
}

/**
 * Defaults for SimplePrefs.
 */
export class SimplePrefsDefaults {
  /**
   *
   * @param {{defaults: Defaults}} defaults
   */
  constructor ({defaults}) {
    this.defaults = defaults;
  }
  /**
   * Get parsed default value for a preference.
   * @param {string} key Preference key
   * @returns {Promise<JSONValue>}
   */
  async getPrefDefault (key) {
    return await this.defaults[key] ?? null;
  }

  /**
   * Set parsed default value for a preference.
   * @param {string} key Preference key
   * @param {JSONValue} value
   * @returns {Promise<JSONValue>} The old value
   */
  async setPrefDefault (key, value) {
    const oldValue = this.defaults[key] ?? null;
    this.defaults[key] = value;
    return await oldValue;
  }
}

/**
 * Simplified factory for `SimplePrefsDefaults`
 * @param {Defaults} [defaults]
 * @returns {SimplePrefsDefaults}
 */
export function simplePrefsDefaults (defaults = {}) {
  return new SimplePrefsDefaults({defaults});
}
