import DummyClass from '../src/privacy-guard';
import PrivacyGuard from '../src/privacy-guard';

/**
 * Dummy test
 */
describe('PrivacyGuard', () => {
  let guard: PrivacyGuard;

  beforeEach(() => {
    guard = new PrivacyGuard({
      events: {
        onLevelChanged: (level: string) => {
          return level;
        }
      }
    });
  });

  it('should have valid default options', () => {
    expect(guard.options).toBeTruthy();
    expect(guard.options.cookieName).toBe('privacy-guard-level');

    expect(guard.options.layer).toBeTruthy();
    expect(guard.options.layer.className).toBe('privacy-layer');
    expect(guard.options.layer.container).toBe(document.body);
    expect(guard.options.layer.templateSelector).toBe('#privacy-layer');

    expect(guard.options.levels.length).toBeGreaterThan(0);
  });

  it('should provide init function', () => {
    expect(typeof guard.init).toBe('function');
  });

  it('should provide showLayer function', () => {
    expect(typeof guard.showLayer).toBe('function');
  });

  it('should provide hideLayer function', () => {
    expect(typeof guard.hideLayer).toBe('function');
  });

  it('#init should try to restore level', () => {
    const spy = jest.spyOn(guard, 'restoreLevel');

    guard.init();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('#selectLevel should fire change event', () => {
    const spy = jest.spyOn(guard.options.events, 'onLevelChanged');

    guard.init();
    guard.selectLevel('basic');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('#selectLevel should try to store level', () => {
    const spy = jest.spyOn(guard, 'storeLevel');

    guard.selectLevel('basic');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('#storeLevel should store level in cookie', () => {
    guard.init();
    guard.storeLevel('basic');

    const cookieMatch = document.cookie.match(
      `(^|;)\\s*${guard.options.cookieName}\\s*=\\s*([^;]+)`
    );
    const restoredLevel = cookieMatch ? cookieMatch.pop() : null;

    expect(restoredLevel).toBe('basic');
  });

  it('#restoreLevel should read level from cookie', () => {
    const spy = jest.spyOn(guard, 'selectLevel');

    guard.storeLevel('basic');
    guard.restoreLevel();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
