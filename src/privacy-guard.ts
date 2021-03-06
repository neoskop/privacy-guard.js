import { PrivacyGuardOptions } from './privacy-guard-options.interface';
import './privacy-guard.css';

export default class PrivacyGuard {
  public options: PrivacyGuardOptions;

  private layerElement: HTMLElement | null;
  private readonly layerTemplate: HTMLTemplateElement | null;

  constructor(options?: PrivacyGuardOptions) {
    this.options = {
      cookieName: 'privacy-guard-level',
      events: {
        onLevelChanged: null
      },
      layer: {
        className: 'privacy-layer',
        container: document.body,
        disabled: false,
        templateSelector: '#privacy-layer'
      },
      levels: ['basic', 'analytics', 'targeting'],
      ...options
    };

    if (!this.options.layer.disabled) {
      this.layerElement = this.options.layer.container.querySelector(this.options.layer.className);
      this.layerTemplate = document.querySelector(this.options.layer.templateSelector);
    }
  }

  public init() {
    if (!this.options.layer.disabled && !this.layerElement) {
      if (!this.layerTemplate) {
        console.error('[Privacy Guard] No privacy layer template found.');
      } else {
        const layerContents =
          (this.layerTemplate.content.querySelector(
            `.${this.options.layer.className}`
          ) as HTMLElement) ||
          (this.layerTemplate.querySelector(`.${this.options.layer.className}`) as HTMLElement);

        this.layerElement = this.options.layer.container.appendChild(layerContents) as HTMLElement;
      }
    }

    this.restoreLevel();
  }

  public showLayer() {
    if (
      this.layerElement &&
      !this.layerElement.classList.contains(`${this.options.layer.className}--active`)
    ) {
      this.layerElement.classList.add(`${this.options.layer.className}--active`);
    }
  }

  public hideLayer() {
    if (
      this.layerElement &&
      this.layerElement.classList.contains(`${this.options.layer.className}--active`)
    ) {
      this.layerElement.classList.remove(`${this.options.layer.className}--active`);
    }
  }

  public selectLevel(level: string) {
    const cookieMatch = document.cookie.match(
      `(^|;)\\s*${this.options.cookieName}\\s*=\\s*([^;]+)`
    );
    const previousLevel = cookieMatch ? cookieMatch.pop() : null;

    if (this.options.levels.findIndex(s => s === level) === -1) {
      console.error(`[Privacy Guard] Could not find level "${level}".`);

      if (this.options.defaultLevel !== undefined && this.options.defaultLevel !== null) {
        this.selectLevel(this.options.defaultLevel);
      } else {
        this.selectLevel(this.options.levels[0]);
      }

      return;
    }

    this.storeLevel(level);

    if (this.layerElement) {
      const settingElements = Array.from(this.layerElement.querySelectorAll('[data-level]'));

      if (settingElements) {
        settingElements.forEach(el => {
          if (el.getAttribute('data-level') === level) {
            el.setAttribute('data-active', '');
          } else {
            el.removeAttribute('data-active');
          }
        });
      }
    }

    if (typeof this.options.events.onLevelChanged === 'function') {
      this.options.events.onLevelChanged(level, previousLevel);
    }
  }

  public storeLevel(level: string) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    document.cookie = `${
      this.options.cookieName
    }=${level}; expires=${expirationDate.toUTCString()}; path=/`;
  }

  public restoreLevel() {
    const cookieMatch = document.cookie.match(
      `(^|;)\\s*${this.options.cookieName}\\s*=\\s*([^;]+)`
    );
    const restoredLevel = cookieMatch ? cookieMatch.pop() : null;

    if (restoredLevel) {
      this.selectLevel(restoredLevel);
    } else if (this.options.defaultLevel) {
      this.selectLevel(this.options.defaultLevel);
    }
  }
}
