## `class` BaseManager\<T>

- [properties](#properties)
  - [collection](#public-collection)
- [methods](#methods)
  - [add](#public-async-addfiles)
  - [refresh](#public-async-refreshnames)
  - [remove](#public-removenames)

### # properties

> #### `public` collection
>
> [Discord.Collection](https://discord.js.org/#/docs/collection/stable/class/Collection)<string, T>

### # methods

> #### `public` `async` add(files)
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   files    | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.add('file.js');
> await manager.add(['file.js', 'other-file.js']);
> ```
>
> `return` Promise\<T | T[]>
>
> </details>

> #### `public` `async` refresh(names)
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   names    | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.refresh('name');
> await manager.refresh(['name', 'other-name']);
> ```
>
> `return` Promise\<T | T[]>
>
> </details>

> #### `public` remove(names)
>
> <details>
>
> | parameters |        type        | optional |
> | :--------: | :----------------: | :------: |
> |   names    | string or string[] |  false   |
>
> ##### example
>
> ```js
> await manager.remove('name');
> await manager.remove(['name', 'other-name']);
> ```
>
> </details>
