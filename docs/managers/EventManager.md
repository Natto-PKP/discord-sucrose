## `class` EventManager

- [properties](#properties)
  - [collection](#public-collection)
- [methods](#methods)
  - [add](#public-async-addevents)
  - [listen](#public-async-listenevents)
  - [mute](#public-async-muteevents)
  - [refresh](#public-async-refreshevents)
  - [remove](#public-async-removeevents)

### # properties

> #### `public` collection
>
> [Discord.Collection](https://discord.js.org/#/docs/collection/stable/class/Collection)<string, [Event](../structures/Event.md)>

### # methods

> #### `public` `async` add(events)
>
> Add event
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   events   | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.add('ready');
> await manager.add(['ready', 'messageCreate']);
> ```
>
> `return` Promise\<[Event](../structures/Event.md) | [Event](../structures/Event.md)[]>
>
> </details>

> #### `public` `async` listen(events)
>
> Active/Listen event
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   events   | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.listen('ready');
> await manager.listen(['ready', 'messageCreate']);
> ```
>
> `return` Promise\<[Event](../structures/Event.md) | [Event](../structures/Event.md)[]>
>
> </details>

> #### `public` `async` mute(events)
>
> Desactive/Mute event
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   events   | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.mute('ready');
> await manager.mute(['ready', 'messageCreate']);
> ```
>
> `return` Promise\<[Event](../structures/Event.md) | [Event](../structures/Event.md)[]>
>
> </details>

> #### `public` `async` refresh(events)
>
> Mute and listen event
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   events   | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.refresh('ready');
> await manager.refresh(['ready', 'messageCreate']);
> ```
>
> `return` Promise\<[Event](../structures/Event.md) | [Event](../structures/Event.md)[]>
>
> </details>

> #### `public` `async` remove(events)
>
> Delete event
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   events   | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.remove('ready');
> await manager.remove(['ready', 'messageCreate']);
> ```
>
> `return` Promise\<[Event](../structures/Event.md) | [Event](../structures/Event.md)[]>
>
> </details>
