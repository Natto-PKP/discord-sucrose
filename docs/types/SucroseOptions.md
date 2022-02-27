# `interface` SucroseOptions `extends` [Discord.ClientOptions](https://discord.js.org/#/docs/discord.js/stable/typedef/ClientOptions)

|       property       |    type     | optional | default | description                                              |
| :------------------: | :---------: | :------: | :-----: | :------------------------------------------------------- |
|       contents       |   object    |   true   |   { }   |                                                          |
| contents.interaction |   object    |   true   | { ... } | customize error message for interactionCreate event      |
|         env          |   object    |   true   |   { }   | environment properties                                   |
|      env.source      |   string    |   true   |  './'   | your bot folder (for typescript, set dist or src folder) |
|    env.extension     | 'js'or 'ts' |   true   |  'js'   | your files extension                                     |
|        token         |   string    |  false   |         | your discord bot token                                   |
