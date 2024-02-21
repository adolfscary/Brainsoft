# Start with docker compose up

## Clean up

```bash
# clean up
docker compose down -v
```

## Start

```bash
docker compose up --build
docker compose exec app yarn db:push
docker compose exec app yarn db:seed
```

## Stop

```bash
docker compose down -v
```

# Development devcontainer

Make sure no previous docker compose instances are running

```bash
docker compose down -v
docker compose -f docker-compose.dev.yml down -v
```

Open project in devcontainer
VS-CODE: ctrl+shift+p => Dev Containers: Rebuild and Reopen in Container

```bash
yarn start:dev
```

# Development locally

## Clean up

```bash
docker compose -f docker-compose.dev.yml down -v
```

## Start

```bash
yarn
cp .env.sample .env
docker compose -f docker-compose.dev.yml up -d
yarn db:push
yarn db:seed
yarn start:dev
```

## Stop

```bash
docker compose -f docker-compose.dev.yml down -v
```

# Restart database

```bash
yarn db:reset
yarn db:push
yarn db:seed
```

# How to run tests

Make sure mongodb container is running
Remove .env file if you inside devcontainer

## Unit tests

```bash
yarn test
```

## E2E tests

```bash
yarn test:e2e
```
