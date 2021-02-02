# Bumble Code Test

This code test aims at creating an auto-updating twitter-like feed

## Feature Requirements: Run an auto-updating twitter-like feed.

This page is dedicated to the usage of the `bumble-code-test` app.<br/>
To learn more about the instructions and architectural decisions, please navigate to the respective pages.

- [Usage](#usage)
  A document explaining how to run the `bumble-code-test` app

- [Instructions](./instructions.md)
  A document listing the instructions sent by Bumble as well as the Acceptance Criteria deduce from them.

- [Architectural Decisions](./architectural-decisions.md)
  A document detailing the Tech Stack as well as the architectural and code decisions made for this code test.

### Usage

- `yarn` - Install dependencies
- `yarn start` - Start webpack server for development
- `yarn build` - Build bundle for production
- `yarn test` - Runs the jest test files

In order to start the application, run the following commands:

```
    yarn
    yarn start:dev
```

#### Environments

The environment variables have been added to `config.json` file in `./src`

### Folder Structure

The app is organised following the following folder pattern:

```
--- clients
--- componentsLibrary
------ components
------ styles
------ utils
--- containers
--- helpers
--- providers
```
