import data from '../../data/button';
import { Button } from '../../../src/structures/Button';

const button = new Button(data);

// # Execute
describe('execute method', () => {
  it('should setExecute', () => {
    button.execute = () => { };
    expect(button.execute).toEqual(expect.any(Function));
  });

  it('should set execute to null', () => {
    button.execute = null;
    expect(button.execute).toBeNull();
  });
});

// # BeforeExecute
describe('beforeExecute method', () => {
  it('should set beforeExecute', () => {
    button.beforeExecute = () => { };
    expect(button.beforeExecute).toEqual(expect.any(Function));
  });

  it('should set beforeExecute to null', () => {
    button.beforeExecute = null;
    expect(button.beforeExecute).toBeNull();
  });
});

// # AfterExecute
describe('afterExecute method', () => {
  it('should set afterExecute', () => {
    button.afterExecute = () => { };
    expect(button.afterExecute).toEqual(expect.any(Function));
  });

  it('should set afterExecute to null', () => {
    button.afterExecute = null;
    expect(button.afterExecute).toBeNull();
  });
});
