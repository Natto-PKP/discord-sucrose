import Button from '../../../src/structures/Button';
import Cooldown from '../../../src/structures/Cooldown';
import Permission from '../../../src/structures/Permission';

const cooldown = new Cooldown({ label: 'test', duration: 1000, type: 'GUILD' });
const permission = new Permission({ label: 'test', type: 'USER', allowed: ['4512985654'] });

const button = new Button();

// # cooldowns
describe('addCooldown method', () => {
  it('should add cooldown', () => {
    button.addCooldowns(cooldown);
    expect((button.cooldowns as []).length).toBe(1);
  });

  it('should return button', () => {
    expect(button.addCooldowns(cooldown)).toBeInstanceOf(Button);
  });
});

describe('setCooldowns method', () => {
  it('should set cooldowns', () => {
    button.cooldowns = [cooldown];
    expect(button.cooldowns?.length).toBe(1);
  });

  it('should set cooldowns to null', () => {
    button.cooldowns = null;
    expect(button.cooldowns).toBeNull();
  });
});

// # permissions
describe('addPermission method', () => {
  it('should add permission', () => {
    button.addPermissions(permission);
    expect((button.permissions as [])?.length).toBe(1);
  });

  it('should return button', () => {
    expect(button.addPermissions(permission)).toBeInstanceOf(Button);
  });
});

describe('setPermissions method', () => {
  it('should set permissions', () => {
    button.permissions = [permission];
    expect(button.permissions?.length).toBe(1);
  });

  it('should set permissions to null', () => {
    button.permissions = null;
    expect(button.permissions).toBeNull();
  });
});
