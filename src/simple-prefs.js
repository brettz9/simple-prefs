/**
 * @module SimplePrefs
 */

/**
* @typedef {PlainObject<{string: module:SimplePrefs.Value}>}
*   module:SimplePrefs.Defaults
*/

/**
* @typedef {boolean|number|string} module:SimplePrefs.Value
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
  async getPref (key) { // eslint-disable-line require-await
    const result = localStorage.getItem(this.namespace + key);
    return result === null
      ? this.prefDefaults.getPrefDefault(key)
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
  async setPref (key, val) { // eslint-disable-line require-await
    return localStorage.setItem(this.namespace + key, JSON.stringify(val));
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
}

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
  async getPrefDefault (key) { // eslint-disable-line require-await
    return this.defaults[key];
  }

  /**
   * Set parsed default value for a preference.
   * @param {string} key Preference key
   * @param {module:SimplePrefs.Value} value
   * @returns {Promise<module:SimplePrefs.Value>} The old value
   */
  async setPrefDefault (key, value) { // eslint-disable-line require-await
    const oldValue = this.defaults[key];
    this.defaults[key] = value;
    return oldValue;
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
