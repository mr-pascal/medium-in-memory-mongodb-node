# medium-in-memory-mongodb-node

Example on how to use an in-memory MongoDB for unit/integration testing purposes.

#### Getting started

```
### Install all modules
npm install

### Start tests
npm run test
```


#### NPM Commands

Using the below command substituting `XXX` in `npm run XXX`.

| Command         | Effect        |
| -------------   | ------------- | 
| `test`          | Run all tests |
| `clean`         | Delete `dist` folder | 
| `build`         | Trigger a clean build | 
| `lint`          | Run `eslint` on all TypeScript files under `src`      |
| `lint:write`    | Run `eslint` and fix all TypeScript files under `src`      | 