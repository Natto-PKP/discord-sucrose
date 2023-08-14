import ButtonManager from './ButtonManager';
import CooldownManager from './CooldownManager';

export interface InteractionManagerOptions {
  managers?: {
    buttons?: ButtonManager | null;
    cooldowns?: CooldownManager | null;
  } | null;
}

export default class InteractionManager {
  public buttons: ButtonManager;

  public cooldowns: CooldownManager;

  constructor(options?: InteractionManagerOptions) {
    this.buttons = options?.managers?.buttons || new ButtonManager();
    this.cooldowns = options?.managers?.cooldowns || new CooldownManager();
  }
}
