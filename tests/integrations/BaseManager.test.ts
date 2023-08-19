import { ButtonManager } from '../../src/managers/ButtonManager';
import { Button } from '../../src/structures/Button';
import data from '../data/button';

const manager = new ButtonManager();
const button = new Button(data);

describe('add method', () => {
  it('should add a button', () => {
    manager.add(button);
    expect(manager.collection.has(button.label)).toBe(true);
  });
});

describe('remove method', () => {
  it('should remove a button', () => {
    manager.remove(button);
    expect(manager.collection.has(button.label)).toBe(false);
  });
});
