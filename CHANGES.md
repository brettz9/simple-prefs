# simple-prefs CHANGES

## 0.8.0

### User-impacting

- Enhancement: Add `listen` method to listen for namespace-specific or
  namespace + key specific storage events

### Dev-impacting

- npm: Update devDeps.

## 0.7.0

### User-impacting

- Breaking change: Specify Node >= 12
- Enhancement: Remove need for regeneratorRuntime

### Dev-impacting

- Linting: As per latest ash-nazg
- Linting; Remove unneeded `.remarkrc` file
- Build: Use JSON extension with `.babelrc`
- npm: Add `lint` script
- npm: Switch to pnpm
- npm: Update devDeps.

## 0.6.0

- Breaking change: Bump `engines` to 4.0.0 (needs `Object.assign`)
- Build: Update per latest Babel/Rollup
- Linting (ESLint): Update per latest ash-nazg
- Linting: Check RC file
- npm: Ignore Rollup file
- npm: Use `rollup/plugin-babel` over deprecated `rollup-plugin-babel`
    and make `babelHelpers` explicit
- npm: Update devDeps

## 0.5.0

- Breaking: Avoid specifying `regenerator-runtime` and `core-js-bundle`
  as dependencies (they will be needed by applications, however)

## 0.4.0

- Enhancement: Add convenience `bind` method
- Maintenance: Add `.editorconfig`

## 0.3.0

- Linting (ESLint): Add linting of Markdown and HTML JS
- Linting (ESLint): Per latest ash-nazg, fix jsdoc
- npm: Update deps and devDeps

## 0.2.0

- Breaking change: Switch from deprecated @babel/polyfill to
  core-js-bundle and regenerator-runtime

## 0.1.0

- Initial version
