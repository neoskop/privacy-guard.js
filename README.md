# Privacy-Guard.js

Dependency-free JavaScript library for managing privacy levels on the web. Written in TypeScript.

## Installation

```
npm install @neoskop/privacy-guard.js
```

## Basic Usage

Have a look at the demo directory for a complete example.

#### 1. Load the base styles

```html
<link rel="stylesheet" href="privacy-guard.es5.css">
```

#### 2. Define the overlay template

```html
<template id="privacy-layer">
  <div class="privacy-layer">
    <div class="privacy-layer__inner">
      <button onClick="guard.hideLayer()"
              class="privacy-layer__close-button">
        Schließen
      </button>
      <div class="privacy-layer__settings">
        <h2>Levels</h2>
        <button type="button"
                onClick="guard.selectLevel('basic')">Basic</button>
        <button type="button"
                onClick="guard.selectLevel('analytics')">Analytics</button>
        <button type="button"
                onClick="guard.selectLevel('targeting')">Targeting</button>
        <div data-level="basic">
          Active: Basic
        </div>
        <div data-level="analytics">
          Active: Analytics
        </div>
        <div data-level="targeting">
          Active: Targeting
        </div>
      </div>
    </div>
  </div>
</template>
```

Elements with the `data-level` attribute are displayed when the corresponding privacy guard level is selected. Otherwise they are hidden.

#### 3. Initialize the Privacy Guard

```javascript
import PrivacyGuard from '../src/privacy-guard';

const guard = new PrivacyGuard();
guard.init();
```

## API

```javascript
PrivacyGuard(options?: PrivacyGuardOptions)
```

#### Options

```typescript
interface PrivacyGuardOptions {
  // The name of the cookie that stores the selected privacy guard level
  // Defaults to: "privacy-guard-level"
  cookieName?: string;

  events?: {
    // Callback invoked when the privacy guard level is changed
    onLevelChanged?: (setting: string) => any;
  };

  layer?: {
    // The class name of the overlay container
    // Has to match an element inside the template element
    // Defaults to: "privacy-guard"
    className?: string;

    // Container element the overlay gets appended to
    // Defaults to: document.body
    container?: HTMLElement;

    // Set to true, if you do not want the Privacy Guard to create the overlay
    // Defaults to: false
    disabled?: boolean;

    // The selector for the template element containing the overlay template
    // Defaults to: "#privacy-guard"
    templateSelector?: string;
  };

  // The available privacy guard levels
  // Defaults to: ["basic", "analytics", "targeting"]
  levels?: string[];
}
```

#### Methods

```javascript
const guard = new PrivacyGuard();
```

* `guard.init()`: Initialize the Privacy Guard. Adds the overlay to the DOM.
* `guard.showLayer()`: Shows the overlay.
* `guard.hideLayer()`: Hides the overlay.
* `guard.selectLevel(level: string)`: Selects a privacy guard level.
