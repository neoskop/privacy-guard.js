import PrivacyGuard from '../src/privacy-guard';

const guard = new PrivacyGuard({
  events: {
    onLevelChanged: (setting: string, prevSetting: string) => {
      console.log(`Level changed: ${setting}. Previous: ${prevSetting}`);
    }
  }
});

guard.init();

(window as any).guard = guard;
