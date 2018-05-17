import PrivacyGuard from '../src/privacy-guard';

const guard = new PrivacyGuard({
  events: {
    onLevelChanged: (setting: string) => {
      console.log(`Level changed: ${setting}`);
    }
  }
});

guard.init();

(window as any).guard = guard;
