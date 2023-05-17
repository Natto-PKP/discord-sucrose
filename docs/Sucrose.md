# Class: Sucrose

Sucrose client

**`Example`**

Initialize new Sucrose client
```js
Sucrose.build({
  env: { ext: "ts", source: "src" },
});
```

## Hierarchy

- `Client`

  ↳ **`Sucrose`**

## Table of contents

### Constructors

- [constructor](../wiki/Sucrose#constructor)

### Properties

- [application](../wiki/Sucrose#application)
- [channels](../wiki/Sucrose#channels)
- [cooldown](../wiki/Sucrose#cooldown)
- [events](../wiki/Sucrose#events)
- [guilds](../wiki/Sucrose#guilds)
- [interactions](../wiki/Sucrose#interactions)
- [logger](../wiki/Sucrose#logger)
- [options](../wiki/Sucrose#options)
- [permission](../wiki/Sucrose#permission)
- [readyTimestamp](../wiki/Sucrose#readytimestamp)
- [rest](../wiki/Sucrose#rest)
- [shard](../wiki/Sucrose#shard)
- [sweepers](../wiki/Sucrose#sweepers)
- [token](../wiki/Sucrose#token)
- [user](../wiki/Sucrose#user)
- [users](../wiki/Sucrose#users)
- [voice](../wiki/Sucrose#voice)
- [ws](../wiki/Sucrose#ws)
- [captureRejectionSymbol](../wiki/Sucrose#capturerejectionsymbol)
- [captureRejections](../wiki/Sucrose#capturerejections)
- [defaultMaxListeners](../wiki/Sucrose#defaultmaxlisteners)
- [errorMonitor](../wiki/Sucrose#errormonitor)

### Accessors

- [\_censoredToken](../wiki/Sucrose#_censoredtoken)
- [emojis](../wiki/Sucrose#emojis)
- [readyAt](../wiki/Sucrose#readyat)
- [uptime](../wiki/Sucrose#uptime)

### Methods

- [addListener](../wiki/Sucrose#addlistener)
- [destroy](../wiki/Sucrose#destroy)
- [emit](../wiki/Sucrose#emit)
- [eventNames](../wiki/Sucrose#eventnames)
- [fetchGuildPreview](../wiki/Sucrose#fetchguildpreview)
- [fetchGuildTemplate](../wiki/Sucrose#fetchguildtemplate)
- [fetchGuildWidget](../wiki/Sucrose#fetchguildwidget)
- [fetchInvite](../wiki/Sucrose#fetchinvite)
- [fetchPremiumStickerPacks](../wiki/Sucrose#fetchpremiumstickerpacks)
- [fetchSticker](../wiki/Sucrose#fetchsticker)
- [fetchVoiceRegions](../wiki/Sucrose#fetchvoiceregions)
- [fetchWebhook](../wiki/Sucrose#fetchwebhook)
- [generateInvite](../wiki/Sucrose#generateinvite)
- [getMaxListeners](../wiki/Sucrose#getmaxlisteners)
- [isReady](../wiki/Sucrose#isready)
- [listenerCount](../wiki/Sucrose#listenercount)
- [listeners](../wiki/Sucrose#listeners)
- [login](../wiki/Sucrose#login)
- [off](../wiki/Sucrose#off)
- [on](../wiki/Sucrose#on)
- [once](../wiki/Sucrose#once)
- [prependListener](../wiki/Sucrose#prependlistener)
- [prependOnceListener](../wiki/Sucrose#prependoncelistener)
- [rawListeners](../wiki/Sucrose#rawlisteners)
- [removeAllListeners](../wiki/Sucrose#removealllisteners)
- [removeListener](../wiki/Sucrose#removelistener)
- [setMaxListeners](../wiki/Sucrose#setmaxlisteners)
- [toJSON](../wiki/Sucrose#tojson)
- [build](../wiki/Sucrose#build)
- [getEventListeners](../wiki/Sucrose#geteventlisteners)
- [listenerCount](../wiki/Sucrose#listenercount-1)
- [on](../wiki/Sucrose#on-1)
- [once](../wiki/Sucrose#once-1)
- [setMaxListeners](../wiki/Sucrose#setmaxlisteners-1)

## Constructors

### constructor

• **new Sucrose**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ClientOptions` |

#### Inherited from

Discord.Client.constructor

#### Defined in

node_modules/discord.js/typings/index.d.ts:936

## Properties

### application

• **application**: ``null`` \| `ClientApplication`

#### Inherited from

Discord.Client.application

#### Defined in

node_modules/discord.js/typings/index.d.ts:943

___

### channels

• **channels**: `ChannelManager`

#### Inherited from

Discord.Client.channels

#### Defined in

node_modules/discord.js/typings/index.d.ts:944

___

### cooldown

• **cooldown**: [`CooldownManager`](../wiki/CooldownManager)

cooldown service

#### Defined in

[typings/index.d.ts:539](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L539)

___

### events

• `Readonly` **events**: [`EventManager`](../wiki/EventManager)

events manager

#### Defined in

[typings/index.d.ts:545](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L545)

___

### guilds

• **guilds**: `GuildManager`

#### Inherited from

Discord.Client.guilds

#### Defined in

node_modules/discord.js/typings/index.d.ts:946

___

### interactions

• `Readonly` **interactions**: [`InteractionManager`](../wiki/InteractionManager)

interactions managers

#### Defined in

[typings/index.d.ts:551](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L551)

___

### logger

• `Readonly` **logger**: [`Logger`](../wiki/Logger)

client logger

#### Defined in

[typings/index.d.ts:557](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L557)

___

### options

• **options**: `Omit`<`ClientOptions`, ``"intents"``\> & { `intents`: `IntentsBitField`  }

#### Inherited from

Discord.Client.options

#### Defined in

node_modules/discord.js/typings/index.d.ts:947

___

### permission

• **permission**: [`PermissionManager`](../wiki/PermissionManager)

permission service

#### Defined in

[typings/index.d.ts:562](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L562)

___

### readyTimestamp

• **readyTimestamp**: ``null`` \| `number`

#### Inherited from

Discord.Client.readyTimestamp

#### Defined in

node_modules/discord.js/typings/index.d.ts:949

___

### rest

• **rest**: `REST`

#### Inherited from

Discord.Client.rest

#### Defined in

node_modules/discord.js/typings/index.d.ts:502

___

### shard

• **shard**: ``null`` \| `ShardClientUtil`

#### Inherited from

Discord.Client.shard

#### Defined in

node_modules/discord.js/typings/index.d.ts:951

___

### sweepers

• **sweepers**: `Sweepers`

#### Inherited from

Discord.Client.sweepers

#### Defined in

node_modules/discord.js/typings/index.d.ts:950

___

### token

• **token**: ``null`` \| `string`

#### Inherited from

Discord.Client.token

#### Defined in

node_modules/discord.js/typings/index.d.ts:952

___

### user

• **user**: ``null`` \| `ClientUser`

#### Inherited from

Discord.Client.user

#### Defined in

node_modules/discord.js/typings/index.d.ts:954

___

### users

• **users**: `UserManager`

#### Inherited from

Discord.Client.users

#### Defined in

node_modules/discord.js/typings/index.d.ts:955

___

### voice

• **voice**: `ClientVoiceManager`

#### Inherited from

Discord.Client.voice

#### Defined in

node_modules/discord.js/typings/index.d.ts:956

___

### ws

• **ws**: `WebSocketManager`

#### Inherited from

Discord.Client.ws

#### Defined in

node_modules/discord.js/typings/index.d.ts:957

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](../wiki/Sucrose#capturerejectionsymbol)

#### Inherited from

Discord.Client.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:291

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

Discord.Client.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:296

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

Discord.Client.defaultMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:297

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](../wiki/Sucrose#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

Discord.Client.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:290

## Accessors

### \_censoredToken

• `Private` `get` **_censoredToken**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

#### Inherited from

Discord.Client.\_censoredToken

#### Defined in

node_modules/discord.js/typings/index.d.ts:941

___

### emojis

• `get` **emojis**(): `BaseGuildEmojiManager`

#### Returns

`BaseGuildEmojiManager`

#### Inherited from

Discord.Client.emojis

#### Defined in

node_modules/discord.js/typings/index.d.ts:945

___

### readyAt

• `get` **readyAt**(): `If`<`Ready`, `Date`, ``null``\>

#### Returns

`If`<`Ready`, `Date`, ``null``\>

#### Inherited from

Discord.Client.readyAt

#### Defined in

node_modules/discord.js/typings/index.d.ts:948

___

### uptime

• `get` **uptime**(): `If`<`Ready`, `number`, ``null``\>

#### Returns

`If`<`Ready`, `number`, ``null``\>

#### Inherited from

Discord.Client.uptime

#### Defined in

node_modules/discord.js/typings/index.d.ts:953

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`Sucrose`](../wiki/Sucrose)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.addListener

#### Defined in

node_modules/@types/node/events.d.ts:317

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

Discord.Client.destroy

#### Defined in

node_modules/discord.js/typings/index.d.ts:958

___

### emit

▸ **emit**<`K`\>(`event`, `...args`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `K` |
| `...args` | `ClientEvents`[`K`] |

#### Returns

`boolean`

#### Inherited from

Discord.Client.emit

#### Defined in

node_modules/discord.js/typings/index.d.ts:984

▸ **emit**<`S`\>(`event`, `...args`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Exclude`<`S`, keyof `ClientEvents`\> |
| `...args` | `unknown`[] |

#### Returns

`boolean`

#### Inherited from

Discord.Client.emit

#### Defined in

node_modules/discord.js/typings/index.d.ts:985

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

Discord.Client.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:632

___

### fetchGuildPreview

▸ **fetchGuildPreview**(`guild`): `Promise`<`GuildPreview`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `guild` | `GuildResolvable` |

#### Returns

`Promise`<`GuildPreview`\>

#### Inherited from

Discord.Client.fetchGuildPreview

#### Defined in

node_modules/discord.js/typings/index.d.ts:959

___

### fetchGuildTemplate

▸ **fetchGuildTemplate**(`template`): `Promise`<`GuildTemplate`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `template` | `string` |

#### Returns

`Promise`<`GuildTemplate`\>

#### Inherited from

Discord.Client.fetchGuildTemplate

#### Defined in

node_modules/discord.js/typings/index.d.ts:961

___

### fetchGuildWidget

▸ **fetchGuildWidget**(`guild`): `Promise`<`Widget`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `guild` | `GuildResolvable` |

#### Returns

`Promise`<`Widget`\>

#### Inherited from

Discord.Client.fetchGuildWidget

#### Defined in

node_modules/discord.js/typings/index.d.ts:966

___

### fetchInvite

▸ **fetchInvite**(`invite`, `options?`): `Promise`<`Invite`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `invite` | `string` |
| `options?` | `ClientFetchInviteOptions` |

#### Returns

`Promise`<`Invite`\>

#### Inherited from

Discord.Client.fetchInvite

#### Defined in

node_modules/discord.js/typings/index.d.ts:960

___

### fetchPremiumStickerPacks

▸ **fetchPremiumStickerPacks**(): `Promise`<`Collection`<`string`, `StickerPack`\>\>

#### Returns

`Promise`<`Collection`<`string`, `StickerPack`\>\>

#### Inherited from

Discord.Client.fetchPremiumStickerPacks

#### Defined in

node_modules/discord.js/typings/index.d.ts:964

___

### fetchSticker

▸ **fetchSticker**(`id`): `Promise`<`Sticker`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`Sticker`\>

#### Inherited from

Discord.Client.fetchSticker

#### Defined in

node_modules/discord.js/typings/index.d.ts:963

___

### fetchVoiceRegions

▸ **fetchVoiceRegions**(): `Promise`<`Collection`<`string`, `VoiceRegion`\>\>

#### Returns

`Promise`<`Collection`<`string`, `VoiceRegion`\>\>

#### Inherited from

Discord.Client.fetchVoiceRegions

#### Defined in

node_modules/discord.js/typings/index.d.ts:962

___

### fetchWebhook

▸ **fetchWebhook**(`id`, `token?`): `Promise`<`Webhook`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `token?` | `string` |

#### Returns

`Promise`<`Webhook`\>

#### Inherited from

Discord.Client.fetchWebhook

#### Defined in

node_modules/discord.js/typings/index.d.ts:965

___

### generateInvite

▸ **generateInvite**(`options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `InviteGenerationOptions` |

#### Returns

`string`

#### Inherited from

Discord.Client.generateInvite

#### Defined in

node_modules/discord.js/typings/index.d.ts:967

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](../wiki/Sucrose#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

Discord.Client.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:489

___

### isReady

▸ **isReady**(): this is Client<true\>

#### Returns

this is Client<true\>

#### Inherited from

Discord.Client.isReady

#### Defined in

node_modules/discord.js/typings/index.d.ts:969

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`Since`**

v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

Discord.Client.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Discord.Client.listeners

#### Defined in

node_modules/@types/node/events.d.ts:502

___

### login

▸ **login**(`token?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token?` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Discord.Client.login

#### Defined in

node_modules/discord.js/typings/index.d.ts:968

___

### off

▸ **off**<`K`\>(`event`, `listener`): [`Sucrose`](../wiki/Sucrose)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `K` |
| `listener` | (...`args`: `ClientEvents`[`K`]) => `Awaitable`<`void`\> |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.off

#### Defined in

node_modules/discord.js/typings/index.d.ts:987

▸ **off**<`S`\>(`event`, `listener`): [`Sucrose`](../wiki/Sucrose)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Exclude`<`S`, keyof `ClientEvents`\> |
| `listener` | (...`args`: `any`[]) => `Awaitable`<`void`\> |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.off

#### Defined in

node_modules/discord.js/typings/index.d.ts:988

___

### on

▸ **on**<`K`\>(`event`, `listener`): [`Sucrose`](../wiki/Sucrose)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `K` |
| `listener` | (...`args`: `ClientEvents`[`K`]) => `Awaitable`<`void`\> |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.on

#### Defined in

node_modules/discord.js/typings/index.d.ts:972

▸ **on**<`S`\>(`event`, `listener`): [`Sucrose`](../wiki/Sucrose)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Exclude`<`S`, keyof `ClientEvents`\> |
| `listener` | (...`args`: `any`[]) => `Awaitable`<`void`\> |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.on

#### Defined in

node_modules/discord.js/typings/index.d.ts:973

___

### once

▸ **once**<`K`\>(`event`, `listener`): [`Sucrose`](../wiki/Sucrose)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `K` |
| `listener` | (...`args`: `ClientEvents`[`K`]) => `Awaitable`<`void`\> |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.once

#### Defined in

node_modules/discord.js/typings/index.d.ts:978

▸ **once**<`S`\>(`event`, `listener`): [`Sucrose`](../wiki/Sucrose)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Exclude`<`S`, keyof `ClientEvents`\> |
| `listener` | (...`args`: `any`[]) => `Awaitable`<`void`\> |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.once

#### Defined in

node_modules/discord.js/typings/index.d.ts:979

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`Sucrose`](../wiki/Sucrose)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:597

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`Sucrose`](../wiki/Sucrose)

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:613

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`Since`**

v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Discord.Client.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:532

___

### removeAllListeners

▸ **removeAllListeners**<`K`\>(`event?`): [`Sucrose`](../wiki/Sucrose)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `K` |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.removeAllListeners

#### Defined in

node_modules/discord.js/typings/index.d.ts:993

▸ **removeAllListeners**<`S`\>(`event?`): [`Sucrose`](../wiki/Sucrose)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `Exclude`<`S`, keyof `ClientEvents`\> |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.removeAllListeners

#### Defined in

node_modules/discord.js/typings/index.d.ts:994

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`Sucrose`](../wiki/Sucrose)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and_before_ the last listener finishes execution will
not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:457

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Sucrose`](../wiki/Sucrose)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Sucrose`](../wiki/Sucrose)

#### Inherited from

Discord.Client.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:483

___

### toJSON

▸ **toJSON**(): `unknown`

#### Returns

`unknown`

#### Inherited from

Discord.Client.toJSON

#### Defined in

node_modules/discord.js/typings/index.d.ts:970

___

### build

▸ `Static` **build**(`options`): `Promise`<[`Sucrose`](../wiki/Sucrose)\>

build your Sucrose client

**`Example`**

```js
const client = await Sucrose.build(options);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SucroseOptions`](../wiki/SucroseOptions)<``true``, ``false``\> | Sucrose options |

#### Returns

`Promise`<[`Sucrose`](../wiki/Sucrose)\>

#### Defined in

[typings/index.d.ts:573](https://github.com/Natto-PKP/discord-sucrose/blob/9e8624c/typings/index.d.ts#L573)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
const { getEventListeners, EventEmitter } = require('events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  getEventListeners(ee, 'foo'); // [listener]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  getEventListeners(et, 'foo'); // [listener]
}
```

**`Since`**

v15.2.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Discord.Client.getEventListeners

#### Defined in

node_modules/@types/node/events.d.ts:262

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

Discord.Client.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:234

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
const { on, EventEmitter } = require('events');
const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

**`Since`**

v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

Discord.Client.on

#### Defined in

node_modules/@types/node/events.d.ts:217

▸ `Static` **on**<`E`, `K`\>(`eventEmitter`, `eventName`): `AsyncIterableIterator`<`E` extends `Client`<`boolean`\> ? `ClientEvents`[`K`] : `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `__module` |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventEmitter` | `E` |
| `eventName` | `E` extends `Client`<`boolean`\> ? `K` : `string` |

#### Returns

`AsyncIterableIterator`<`E` extends `Client`<`boolean`\> ? `ClientEvents`[`K`] : `any`\>

#### Inherited from

Discord.Client.on

#### Defined in

node_modules/discord.js/typings/index.d.ts:229

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
const { once, EventEmitter } = require('events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.log('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.log('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

**`Since`**

v11.13.0, v10.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

Discord.Client.once

#### Defined in

node_modules/@types/node/events.d.ts:157

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

Discord.Client.once

#### Defined in

node_modules/@types/node/events.d.ts:158

▸ `Static` **once**<`E`, `K`\>(`eventEmitter`, `eventName`): `Promise`<`E` extends `Client`<`boolean`\> ? `ClientEvents`[`K`] : `any`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `__module` |
| `K` | extends keyof `ClientEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventEmitter` | `E` |
| `eventName` | `E` extends `Client`<`boolean`\> ? `K` : `string` |

#### Returns

`Promise`<`E` extends `Client`<`boolean`\> ? `ClientEvents`[`K`] : `any`[]\>

#### Inherited from

Discord.Client.once

#### Defined in

node_modules/discord.js/typings/index.d.ts:225

___

### setMaxListeners

▸ `Static` **setMaxListeners**(`n?`, `...eventTargets`): `void`

```js
const {
  setMaxListeners,
  EventEmitter
} = require('events');

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

**`Since`**

v15.4.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | (`EventEmitter` \| `DOMEventTarget`)[] | - |

#### Returns

`void`

#### Inherited from

Discord.Client.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:280
