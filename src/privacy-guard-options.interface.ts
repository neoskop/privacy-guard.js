export interface PrivacyGuardOptions {
  cookieName?: string;
  defaultLevel?: string;
  events?: {
    onLevelChanged?: (setting: string) => any;
  };
  layer?: {
    className?: string;
    container?: HTMLElement;
    disabled?: boolean;
    templateSelector?: string;
  };
  levels?: string[];
}
