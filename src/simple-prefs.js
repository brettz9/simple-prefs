/**
 * @module SimplePrefs
 */

/**
* @typedef {PlainObject<{
* string: module:SimplePrefs.Value}>} module:SimplePrefs.Defaults
*/

/**
* @typedef {boolean|number|string} module:SimplePrefs.Value
*/

/**
 * Preferences storage.
 */
export class SimplePrefs {
  /**
   * @param {PlainObject} cfg
   * @param {string} cfg.namespace Avoid clashes with other apps
   * @param {module:SimplePrefs.Defaults} cfg.defaults
   * @param {module:SimplePrefs.SimplePrefsDefaults} cfg.prefDefaults
   * @returns {void}
   */
  constructor (cfg) {
    this.configurePrefs(cfg);
    this.listeners = [];
  }
  /**
   * @param {PlainObject} cfg
   * @param {string} cfg.namespace Avoid clashes with other apps
   * @param {module:SimplePrefs.Defaults} cfg.defaults
   * @param {module:SimplePrefs.SimplePrefsDefaults} cfg.prefDefaults
   * @returns {void}
   */
  configurePrefs ({
    namespace, defaults, prefDefaults = simplePrefsDefaults(defaults)
  }) {
    Object.assign(this, {namespace, prefDefaults});
  }
  /**
   * Get parsed preference value; returns `Promise` in anticipation
   * of https://domenic.github.io/async-local-storage/ .
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @returns {Promise<module:SimplePrefs.Value>} Resolves to the parsed
   *   value (defaulting if necessary)
   */
  async getPref (key) {
    const result = localStorage.getItem(this.namespace + key);
    return result === null
      ? await this.prefDefaults.getPrefDefault(key)
      : JSON.parse(result);
  }
  /**
   * Set a stringifiable preference value; returns `Promise` in anticipation
   *   of https://domenic.github.io/async-local-storage/ .
   * @param {string} key Preference key (for Chrome-Compatibility, only `\w+`)
   * @param {module:SimplePrefs.Value} val Stringifiable value
   * @returns {Promise<void>} Resolves after setting the item (Not currently
   *    in use)
   */
  async setPref (key, val) {
    return await localStorage.setItem(
      this.namespace + key, JSON.stringify(val)
    );
  }

  /**
  * @typedef {PlainObject} GetPrefSetPref
  * @property {module:SimplePrefs.SimplePrefs#getPref} getPref
  * @property {module:SimplePrefs.SimplePrefs#setPref} setPref
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
  * @returns {void}
  */

  /* eslint-disable promise/prefer-await-to-callbacks -- Repeating event */
  /**
  * @param {string} [key]
  * @param {PreferenceCallback} cb
  * @returns {void}
  */
  listen (key, cb) {
    if (typeof key === 'function') {
      cb = key;
      key = undefined;
    }

    const listener = (e) => {
      if (e.key === null) { // `null` for clear browser action or user `clear()`
        if (key === undefined) { // Only trigger when no key supplied
          return;
        }
      } else {
        if (!e.key.startsWith(this.namespace)) {
          return;
        }
        if (key !== undefined && !e.key.startsWith(this.namespace + key)) {
          return;
        }
      }

      cb(e);
    };

    window.addEventListener('storage', listener);

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
          window.removeEventListener('storage', listener);
          return;
        }
      }
    }
    this.listeners.forEach((listenerItem) => {
      window.removeEventListener('storage', listenerItem);
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
   * @param {module:SimplePrefs.Defaults} defaults
   */
  constructor ({defaults}) {
    this.defaults = defaults;
  }
  /**
   * Get parsed default value for a preference.
   * @param {string} key Preference key
   * @returns {Promise<module:SimplePrefs.Value>}
   */
  async getPrefDefault (key) {
    return await this.defaults[key];
  }

  /**
   * Set parsed default value for a preference.
   * @param {string} key Preference key
   * @param {module:SimplePrefs.Value} value
   * @returns {Promise<module:SimplePrefs.Value>} The old value
   */
  async setPrefDefault (key, value) {
    const oldValue = this.defaults[key];
    this.defaults[key] = value;
    return await oldValue;
  }
}

/**
 * Simplified factory for `SimplePrefsDefaults`
 * @param {module:SimplePrefs.Defaults} defaults
 * @returns {module:SimplePrefs.SimplePrefsDefaults}
 */
export function simplePrefsDefaults (defaults) {
  return new SimplePrefsDefaults({defaults});
}
