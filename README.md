# simple-prefs

Provides [forward-looking](https://github.com/domenic/async-local-storage)
async but simple local storage APIs for which JSON serialization and
deserialization is automated, along with a means to supply defaults.

## Installation

```shell
npm install --save simple-prefs regenerator-runtime
```

For older browser support, you may also need `core-js-bundle`.

### Browser

```html
<script type="./node_modules/regenerator-runtime/runtime.js"></script>
<script type="./node_modules/simple-prefs/dist/index.umd.js"></script>
```

### Browser (ESM)

```js
import './node_modules/regenerator-runtime/runtime.js';
import {SimplePrefs} from './node_modules/simple-prefs/dist/index.esm.js';
```

### Browser (Bundle)

```js
import 'regenerator-runtime';
import {SimplePrefs} from 'simple-prefs';
```

## Usage

### Basic usage

```js
// This is the simple means for specifying defaults
const defaults = {
  someBoolean: true,
  someNumber: 15.4,
  someString: 'A string!'
};
const prefs = new SimplePrefs({namespace: 'myApp-', defaults});

(async () => {

const currentBooleanPrefValue = await prefs.getPref('someBoolean'); // `true`

// Later
await prefs.setPref('someBoolean', false); // `false` (resolves to old setting)

})();
```

For a slightly easier approach, you can use the `bind` method:

```js
const {
  getPref, setPref
} = new SimplePrefs({namespace: 'myApp-', defaults}).bind();

(async () => {

const currentBooleanPrefValue = await getPref('someBoolean'); // `true`

// Later
await setPref('someBoolean', false); // `false` (resolves to old setting)

})();
```

### Listening

You can also listen for [`storage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event)
events.

They can be namespace-specific:

```js
const prefs = new SimplePrefs({namespace: 'myApp-'});

// Returns a StorageEvent: https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent
//  ... but only for storage keys with namespace "myApp-"
prefs.listen((e) => {
  console.log(e.oldValue, e.newValue, e.key, e.storageArea, e.url);
});
```

Or they can also be specific to a particular key:

```js
const prefs = new SimplePrefs({namespace: 'myApp-'});

// Returns a StorageEvent: https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent
//  ... but only for storage keys with namespace "myApp-"
prefs.listen('myKey', (e) => {
  console.log(
    e.oldValue, e.newValue, e.key === 'myApp-myKey', e.storageArea, e.url
  );
});
```
