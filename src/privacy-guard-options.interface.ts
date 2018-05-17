export interface PrivacyGuardOptions {
  cookieName?: string;
  defaultLevel?: string;
  events?: {
    onLevelChanged?: (setting: string) => any;
  };
  layer?: {
    className?: string;
    container?: HTMLElement;
    templateSelector?: string;
  };
  levels?: string[];
}
