import Permission from '../../../src/structures/Permission';

const permission = new Permission({ label: 'test', type: 'USER', allowed: ['4512985654'] });

describe('setType method', () => {
  it('should set type', () => {
    permission.type = 'USER';
    expect(permission.type).toBe('USER');
  });
});

describe('setAllowed method', () => {
  it('should set allowed', () => {
    permission.allowed = ['4512985654'];
    expect(permission.allowed).toBeTruthy();
  });

  it('should set allowed to null', () => {
    permission.allowed = null;
    expect(permission.allowed).toBeNull();
  });
});

describe('setDenied method', () => {
  it('should set denied', () => {
    permission.denied = ['4512985654'];
    expect(permission.denied).toBeTruthy();
  });

  it('should set denied to null', () => {
    permission.denied = null;
    expect(permission.denied).toBeNull();
  });
});

describe('setCondition method', () => {
  it('should set condition', () => {
    permission.type = 'CUSTOM';
    permission.condition = () => true;
    expect(permission.condition).toBeTruthy();
  });
});
