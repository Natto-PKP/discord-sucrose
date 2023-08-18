import { EventEmitter } from 'events';
import Discord from 'discord.js';

/**
 * Message pagination navigation action
 * @public
 */
export type MessagePaginationNavigationAction = 'first' | 'previous' | 'next' | 'last' | 'stop' | 'custom' | 'ask_page_number';

/**
 * Message pagination navigation event
 * @public
 */
export type MessagePaginationNavigationEvent = MessagePaginationNavigationAction | 'setter';

/**
 * Message pagination navigation
 * @public
 */
export type MessagePaginationBaseNavigation = { action: 'first' | 'previous' | 'next' | 'stop'; }
| { action: 'custom', callback: MessagePaginationListener }
| { action: 'ask_page_number', content: string | Discord.InteractionReplyOptions | MessagePaginationListener<string | Discord.InteractionReplyOptions>, error?: string }
| { action: 'last', lastPage: number | MessagePaginationListener<number> };

/**
 * Message pagination navigation button
 * @public
 */
export type MessagePaginationNavigationButton = MessagePaginationBaseNavigation & {
  type: 'BUTTON';
  label?: string;
  emoji?: Discord.EmojiIdentifierResolvable;
  style?: Discord.ButtonStyle;
};

/**
 * Message pagination navigation emoji
 * @public
 */
export type MessagePaginationNavigationEmoji = MessagePaginationBaseNavigation & {
  type: 'EMOJI';
  emoji: string;
};

/**
 * Message pagination navigation model
 * @public
 */
export type MessagePaginationNavigationModel = 'MINIMALIST' | 'SIMPLE' | 'COMPLETE' | 'EXTENDED';

/**
 * Message pagination navigation
 * @public
 */
export type MessagePaginationNavigation = MessagePaginationNavigationButton
| MessagePaginationNavigationEmoji;

/**
 * Message pagination collector options
 * @public
 */
export interface MessagePaginationCollectorOptions {
  navigations?: MessagePaginationNavigation[] | MessagePaginationNavigationModel;
  time?: number;
  idle?: number;
  hideNavigationButtonsWhenUseless?: boolean; // TODO: OPTIONS A FAIRE PLUS TARD
  max?: number;
  page?: number;
}

/**
 * Message pagination params
 * @public
 */
export interface MessagePaginationParams {
  message: Discord.Message | Discord.InteractionResponse;
  navigation?: MessagePaginationNavigation;
  page: number;
  reason?: string | null;
}

/**
 * Message pagination listener
 * @internal
 */
type MessagePaginationListener<R = unknown> = (
  params: MessagePaginationParams
) => R | Promise<R>;

const MINIMALIST_NAVIGATIONS = <MessagePaginationNavigation[]>[
  { type: 'EMOJI', action: 'previous', emoji: '⬅️' },
  { type: 'EMOJI', action: 'stop', emoji: '⏹️' },
  { type: 'EMOJI', action: 'next', emoji: '➡️' },
];

const SIMPLE_NAVIGATIONS = <MessagePaginationNavigation[]>[
  {
    type: 'BUTTON',
    action: 'previous',
    style: Discord.ButtonStyle.Secondary,
    emoji: '⬅️',
  },
  {
    type: 'BUTTON',
    action: 'stop',
    style: Discord.ButtonStyle.Danger,
    emoji: '⏹️',
  },
  {
    type: 'BUTTON',
    action: 'next',
    style: Discord.ButtonStyle.Secondary,
    emoji: '➡️',
  },
];

const COMPLETE_NAVIGATION = <MessagePaginationNavigation[]>[
  {
    type: 'BUTTON',
    action: 'first',
    style: Discord.ButtonStyle.Secondary,
    emoji: '⏪',
  },
  ...SIMPLE_NAVIGATIONS,
];

const EXTENDED_NAVIGATION = <MessagePaginationNavigation[]>[
  ...COMPLETE_NAVIGATION,
  {
    type: 'BUTTON',
    action: 'ask_page_number',
    style: Discord.ButtonStyle.Primary,
    emoji: '🔢',
  },
];

const NAVIGATION_MODELS = {
  MINIMALIST: MINIMALIST_NAVIGATIONS,
  SIMPLE: SIMPLE_NAVIGATIONS,
  COMPLETE: COMPLETE_NAVIGATION,
  EXTENDED: EXTENDED_NAVIGATION,
};

/**
 * Message pagination collector
 * @public
 * @example
 * ```ts
 * import { MessagePaginationCollector } from 'sucrose';
 *
 * const collector = new MessagePaginationCollector(message);
 *
 * await collector.addNavigations();
 * await collector.listen();
 *
 * collector.on('first', () => console.log('first'));
 * collector.on('last', () => console.log('last'));
 * collector.on('next', () => console.log('next'));
 * collector.on('previous', () => console.log('previous'));
 * collector.on('ask_page_number', () => console.log('ask_page_number'));
 * ```
 */
export default class MessagePaginationCollector {
  private page = 0;

  private emitter = new EventEmitter();

  private navigations: MessagePaginationNavigation[];

  private componentCollector?: ReturnType<Discord.Message<boolean>['createMessageComponentCollector']>;

  private reactionCollector?: Discord.ReactionCollector;

  constructor(
    public message: Discord.Message,
    private options: MessagePaginationCollectorOptions = { },
  ) {
    let navigations = options.navigations ?? 'SIMPLE';
    if (typeof navigations === 'string') navigations = NAVIGATION_MODELS[navigations];
    this.navigations = navigations;

    if (options.page) this.page = options.page;
  }

  /**
   * add navigations to the message
   * @public
   */
  public async addNavigations() {
    await this.addButtonNavigations();
    await this.addEmojiNavigations();
  }

  /**
   * add navigations buttons to the message
   * @internal
   * @returns - Promise
   */
  private async addButtonNavigations() {
    const { message } = this;
    const buttons = this.navigations.filter((navigation) => navigation.type === 'BUTTON') as MessagePaginationNavigationButton[];
    if (!buttons.length) return;

    const components = buttons.map(
      (button) => MessagePaginationCollector.navigationButtonToComponent(button),
    );

    await message.edit({ components: [{ type: Discord.ComponentType.ActionRow, components }] });
  }

  /**
   * add navigations emojis to the message
   * @internal
   * @returns - Promise
   */
  private async addEmojiNavigations() {
    const { message } = this;
    const emojis = this.navigations.filter((navigation) => navigation.type === 'EMOJI') as MessagePaginationNavigationEmoji[];

    await Promise.all(emojis.map((emoji) => message.react(emoji.emoji)));
  }

  /**
   * listen navigations
   */
  public async listen() {
    await this.listenMessageComponents();
    await this.listenMessageReactions();
  }

  /**
   * listen message components
   * @internal
   * @returns - Promise
   */
  private async listenMessageComponents() {
    const { message } = this;
    const buttons = this.navigations.filter((navigation) => navigation.type === 'BUTTON') as MessagePaginationNavigationButton[];
    if (!buttons.length) return;

    const collector = message.createMessageComponentCollector({
      filter: (interaction) => interaction.user.id === message.author.id,
      time: this.options.time,
      idle: this.options.idle,
      max: this.options.max,
    });

    this.componentCollector = collector;

    collector.on('collect', async (interaction) => {
      if (interaction.componentType !== Discord.ComponentType.Button) return;
      const navigation = buttons.find((button) => button.action === interaction.customId);
      if (!navigation) return;

      await this.handleNavigationAction(navigation, interaction);

      const params = { message, navigation, page: this.page };
      this.emit(navigation.action, params);
    });

    collector.on('end', async (_, reason) => {
      const navigation = buttons.find((b) => b.action === 'stop');
      if (!navigation) return;

      await this.clearComponents().catch(() => null);

      const params = { message, navigation, page: this.page };
      this.emit('stop', { ...params, reason });
    });
  }

  /**
   * listen message reactions
   * @internal
   * @returns - Promise
   */
  private async listenMessageReactions() {
    const { message } = this;
    const emojis = this.navigations.filter((navigation) => navigation.type === 'EMOJI') as MessagePaginationNavigationEmoji[];
    if (!emojis.length) return;

    const collector = message.createReactionCollector({
      filter: (_reaction, user) => user.id === message.author.id,
      time: this.options.time,
      idle: this.options.idle,
      max: this.options.max,
    });

    this.reactionCollector = collector;

    collector.on('collect', async (reaction) => {
      const navigation = emojis.find(
        (emoji) => emoji.emoji === reaction.emoji.id
            || emoji.emoji === reaction.emoji.name
            || emoji.emoji === reaction.emoji.identifier,
      );
      if (!navigation) return;

      await this.handleNavigationAction(navigation);

      this.emit(navigation.action, { message, navigation, page: this.page });
      await reaction.remove();
    });

    collector.on('end', async (_, reason) => {
      const navigation = emojis.find((e) => e.action === 'stop');
      if (!navigation) return;

      await this.clearReactions().catch(() => null);

      const params = { message, navigation, page: this.page };
      this.emit('stop', { ...params, reason });
    });
  }

  /**
   * handle navigation action
   * @internal
   * @param navigation - Navigation
   * @param interaction - Interaction
   */
  private async handleNavigationAction(
    navigation: MessagePaginationNavigation,
    interaction?: Discord.MessageComponentInteraction,
  ) {
    const { message } = this;
    const params = { message, navigation, page: this.page };

    if (navigation.action === 'ask_page_number') {
      const c = typeof navigation.content === 'function' ? await navigation.content(params) : navigation.content;
      const content = (typeof c === 'string' ? { content: c } : c) ?? { content: 'Please, enter a page number:' };
      const m = interaction
        ? await interaction.reply({ ...content, ephemeral: true, fetchReply: true })
        : await message.channel.send(content as Discord.MessageCreateOptions);

      const response = await m.channel.awaitMessages({
        filter: (msg) => {
          const number = Number(msg.content);
          const isNumber = !Number.isNaN(number);
          return msg.author.id === message.author.id && isNumber && number > 0;
        },
        max: 1,
        time: 5000,
        errors: ['time'],
      }).catch(() => null);

      if (!response) {
        const errorMessage = navigation.error || 'You did not enter a valid page number.';
        if (!interaction) {
          const e = await message.channel.send(errorMessage).catch(() => null);
          if (e && e.deletable) setTimeout(() => e.delete().catch(() => null), 5000);
        } else await interaction.followUp({ content: errorMessage, ephemeral: true });
      } else this.page = Number(response.first()?.content) - 1;

      if (m.deletable) await m.delete().catch(() => null);
    } else if (navigation.action === 'last') {
      this.page = typeof navigation.lastPage === 'function' ? await navigation.lastPage(params) : navigation.lastPage;
    } else if (navigation.action === 'first') this.page = 0;
    else if (navigation.action === 'previous') this.page -= 1;
    else if (navigation.action === 'next') this.page += 1;
    else if (navigation.action === 'custom') await navigation.callback(params);
    else if (navigation.action === 'stop') {
      if (this.componentCollector) this.componentCollector.stop('action');
      if (this.reactionCollector) this.reactionCollector.stop('action');
    }
  }

  /**
   * navigation button to component
   * @internal
   * @param button - Button
   * @returns - Button component data
   */
  private static navigationButtonToComponent(button: MessagePaginationNavigationButton) {
    return {
      type: Discord.ComponentType.Button,
      customId: button.action,
      style: button.style ?? Discord.ButtonStyle.Secondary,
      emoji: button.emoji,
      label: button.label,
    } as Discord.ButtonComponentData;
  }

  /**
   * clear components
   * @returns - Promise
   */
  public async clearComponents() {
    const { message } = this;
    if (!message.editable) return;
    await message.edit({ components: [] });
  }

  /**
   * clear reactions
   * @returns - Promise
   */
  public async clearReactions() {
    const { message } = this;
    if (!message.editable) return;
    await message.reactions.removeAll();
  }

  public on(event: MessagePaginationNavigationEvent, listener: MessagePaginationListener): this {
    this.emitter.on(event, listener);
    return this;
  }

  public once(event: MessagePaginationNavigationEvent, listener: MessagePaginationListener): this {
    this.emitter.once(event, listener);
    return this;
  }

  public emit(event: MessagePaginationNavigationEvent, params: MessagePaginationParams): boolean {
    return this.emitter.emit(event, params);
  }

  /**
   * set page
   * @param page - Page
   */
  public setPage(page: number) {
    this.page = page;
    this.emit('setter', { message: this.message, page });
  }

  /**
   * get page
   * @returns - Page
   */
  public getPage() {
    return this.page;
  }
}
