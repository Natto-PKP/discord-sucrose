import Cooldown from '../../../src/structures/Cooldown';

const cooldown = new Cooldown({ label: 'test', duration: 1000, type: 'GUILD' });

describe('includeDiscordBots property', () => {
  it('should return true', () => {
    cooldown.includeDiscordBots = true;
    expect(cooldown.includeDiscordBots).toBeTruthy();
  });
});

describe('setDuration method', () => {
  it('should set duration', () => {
    cooldown.duration = 1000;
    expect(cooldown.duration).toBe(1000);
  });
});

describe('setStack method', () => {
  it('should set stack', () => {
    cooldown.stack = 2;
    expect(cooldown.stack).toBe(2);
  });
});

describe('setType method', () => {
  it('should set type', () => {
    cooldown.type = 'GUILD';
    expect(cooldown.type).toBe('GUILD');
  });
});

describe('addAllowed method', () => {
  it('should add allowed', () => {
    cooldown.addIncludes('4512985654');
    expect(cooldown.includes?.length).toBe(1);
  });

  it('should return cooldown', () => {
    expect(cooldown.addIncludes('4512985654')).toBeInstanceOf(Cooldown);
  });
});

describe('removeAllowed method', () => {
  it('should remove allowed', () => {
    cooldown.removeIncludes('4512985654');
    expect(cooldown.includes?.length).toBe(0);
  });

  it('should return cooldown', () => {
    expect(cooldown.removeIncludes('4512985654')).toBeInstanceOf(Cooldown);
  });
});

describe('setAllowed method', () => {
  it('should set allowed', () => {
    cooldown.includes = ['4512985654'];
    expect(cooldown.includes?.length).toBe(1);
  });

  it('should set allowed to null', () => {
    cooldown.includes = null;
    expect(cooldown.includes).toBeNull();
  });
});

describe('addDenied method', () => {
  it('should add denied', () => {
    cooldown.addExcludes('4512985654');
    expect(cooldown.excludes?.length).toBe(1);
  });

  it('should return cooldown', () => {
    expect(cooldown.addExcludes('4512985654')).toBeInstanceOf(Cooldown);
  });
});

describe('removeDenied method', () => {
  it('should remove denied', () => {
    cooldown.removeExcludes('4512985654');
    expect(cooldown.excludes?.length).toBe(0);
  });

  it('should return cooldown', () => {
    expect(cooldown.removeExcludes('4512985654')).toBeInstanceOf(Cooldown);
  });
});

describe('setDenied method', () => {
  it('should set denied', () => {
    cooldown.excludes = ['4512985654'];
    expect(cooldown.excludes?.length).toBe(1);
  });

  it('should set denied to null', () => {
    cooldown.excludes = null;
    expect(cooldown.excludes).toBeNull();
  });
});
