Insurec API

## Description

RESTful PoC API for Insurance Recommendations (or Listings in general) based on user traits determinded by set of questions.

## Installation

```bash
$ npm install
```

## Migration

```
npx prisma dev --preview-feature
```

Or

```
prisma migrate deploy --preview-feature
```

For non-development envs

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
