[7.0.0](700), [6.4.12](#6412), [6.4.6](#646), [6.4.4](#644), [6.3.14](#6314), [6.3.2](#632), [6.2.1](#621), [6.1.6](#616), [6.1.5](#615)

### # `7.0.0`

> ```diff
> # SORRY FOR ALL DEV VERSION !! It'll be more clean from now
>
> + Fix type of select menu and modal
> + Rework permissions system - permissions are now more customizable and understandable
> + Add cooldown system - add configurable cooldown for each interaction
> + Rework event - module with an configurable object
> + Move commands manager to interactions managers
> + Change extends Discord.Collection to cache property
> + Rework logger - he catch well now
> + Rename commands manager methods - define > deploy and delete > undeploy
> + Add configurable recursive on file search on specific folder
> + Add pre-condition in interactions and events
> + Add hooks to interactions and events
>
> - Remove loading animation (useless)
> ```
>
> ```md
> ### In coming
>
> - beautiful documentation in react (it'll take some time)
> - support for message command with prefix (not my priority)
> ```

### # `6.4.12`

> ```diff
> + Update discord.js to 14.11.0
> + Fix and type new select menu type
> + Change commands to interaction commands
> + Move commands directories in /interactions
> ```

### # `6.4.6`

> ```diff
> + Fix "node:events:491; throw er; // Unhandled 'error' event" error with adding `client.on('error', () => {})`
> + Change "output" name on Logger event to "log"
> + Add more exemples in readme
> + Add exemple in with template: dynamically manage commands and more with default eval command
> ```

### # `6.4.4`

> ```diff
> + reword logger again (add style method, and reword some method to me more user friendly)
> ```

### # `6.3.14`

> ```diff
> + rework logger an d add options for (it'll be easer to custom the loger in the futur)
> + better error handling for all manager and listeners
> + update index.d.ts and docs
> - don't look the numbers of versions
> ```

### # `6.3.2`

> ```diff
> + reword readme.md
> + create changelog.md
> + update documentation
> + possible to create and load multiple file in event folder
> + add a option in SucroseOptions (useLogFile), false per default. This option with a true value, will create a logs folder and add log file in at each bot start
> ```

### # `6.2.1`

> ```diff
> + update discord.js to 14.8.0
> + update readme.md
> ```

### # `6.1.6`

> ```diff
> + update discord.js to 14.7.1
> + update readme.md
> ```

### # `6.1.5`

> ```diff
> - emit ready event before sucrose end log
>
> + emit ready event after sucrose end log
> + add husky + commit for proper manage your commit
> ```
