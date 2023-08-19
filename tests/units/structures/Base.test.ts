import { Button } from '../../../src/structures/Button';
import data from '../../data/button';

const button = new Button();

// # Button from data
describe('create button from data', () => {
  it('should return button', () => {
    expect(new Button(data)).toBeInstanceOf(Button);
  });
});

// # label
describe('setLabel method', () => {
  it('should set label', () => {
    button.label = 'test';
    expect(button.label).toBe('test');
  });
});

// # description
describe('setDescription method', () => {
  it('should set description', () => {
    button.description = 'test';
    expect(button.description).toBe('test');
  });
});

// # tags
describe('addTag method', () => {
  it('should add tag', () => {
    button.addTags('test');
    expect(button.tags?.length).toBe(1);
  });

  it('should return button', () => {
    expect(button.addTags('test')).toBeInstanceOf(Button);
  });
});

describe('removeTag method', () => {
  it('should remove tag', () => {
    button.removeTags('test');
    expect(button.tags?.length).toBe(0);
  });

  it('should return button', () => {
    expect(button.removeTags('test')).toBeInstanceOf(Button);
  });
});

describe('setTags method', () => {
  it('should set tags', () => {
    button.tags = ['test'];
    expect(button.tags?.length).toBe(1);
  });

  it('should set tags to null', () => {
    button.tags = null;
    expect(button.tags).toBeNull();
  });
});

// # disabled
describe('setDisabled method', () => {
  it('should set disabled', () => {
    button.disabled = true;
    expect(button.disabled).toBe(true);
  });
});

describe('enable method', () => {
  it('should enable', () => {
    button.enable();
    expect(button.disabled).toBe(false);
  });

  it('should return button', () => {
    expect(button.enable()).toBeInstanceOf(Button);
  });
});

describe('disable method', () => {
  it('should disable', () => {
    button.disable();
    expect(button.disabled).toBe(true);
  });

  it('should return button', () => {
    expect(button.disable()).toBeInstanceOf(Button);
  });
});

// # toJSON
describe('toJSON method', () => {
  it('should return object', () => {
    expect(typeof button.data).toBe('object');
  });
});
