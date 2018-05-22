export interface PrivacyGuardOptions {
  cookieName?: string;
  defaultLevel?: string;
  events?: {
    onLevelChanged?: (level: string, previousLevel?: string) => any;
  };
  layer?: {
    className?: string;
    container?: HTMLElement;
    disabled?: boolean;
    templateSelector?: string;
  };
  levels?: string[];
}
