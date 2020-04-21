# node-dotconfig

Easily create and read config files from the user's home directory.

- 🐝 Config files saved in `ini` [format](https://github.com/npm/ini)
- 🏆 Cross-platform support for Windows, Linux and macOS.
- 💥 Typings readily available
- 🏄‍♂️ Promised-based API
- 🥑 Proper support for nested config objects

Read the [docs](here).

## Motivation

This utility is useful when you want to save `.my-app` config files in the user's home directory. CLIs are well known to use this technique for saving user's preferences.

## Installation

```
npm i node-dotconfig
```

## Usage

```typescript
import { createConfig, readConfig } from 'node-dotconfig';

async function config() {
  await createConfig('.my-cli', { user: { name: 'johndoe', apiKey: '12345' } });
  const config = await readConfig('.my-cli');
  console.log(config.user.name); // 'johndoe'
}
```

This will create the file `~/.my-cli` with the following content:

```ini
[user]
name=johndoe
apiKey=12345
```

## API

- [createConfig](docs)
- [readConfig](docs)
- [updateConfig](docs)
- [deleteConfig](docs)

## Licence

MIT © [Carlos Roso](https://carlosroso.com/)
