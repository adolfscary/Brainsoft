FROM node:20-bookworm as base

RUN corepack enable

USER node

FROM node:20-bookworm-slim as base_slim

RUN apt update && apt install openssl -y
RUN corepack enable

USER node

# ----------------------------------------
FROM base as dev

USER root

RUN apt update && apt install -y sudo git 
RUN npm i zx -g

# ----------------------------------------
FROM base as dev_packages

ENV HOME /home/node

WORKDIR $HOME/app
RUN chown node:node $HOME/app

COPY --chown=node:node package.json yarn.lock .npmrc .yarnrc.yml $HOME/app/

RUN yarn

# ----------------------------------------
FROM base as builder

ENV HOME /home/node

WORKDIR $HOME/app
RUN chown node:node $HOME/app

COPY --from=dev_packages --chown=node:node $HOME/app/node_modules $HOME/app/node_modules
COPY --chown=node:node package.json yarn.lock .npmrc .yarnrc.yml prisma .eslintrc.cjs .prettierrc.json nest-cli.json tsconfig.json tsconfig.build.json $HOME/app/
COPY --chown=node:node src $HOME/app/src
COPY --chown=node:node prisma $HOME/app/prisma

RUN yarn db:generate
RUN yarn build

# ----------------------------------------
FROM base_slim as prod

ENV HOME /home/node
ENV NODE_ENV production

WORKDIR $HOME/app
RUN chown node:node $HOME/app

COPY --chown=node:node package.json yarn.lock .npmrc .yarnrc.yml prisma tsconfig.json $HOME/app/
COPY --chown=node:node src $HOME/app/src
COPY --chown=node:node prisma $HOME/app/prisma
COPY --chown=node:node seed $HOME/app/seed
COPY --from=dev_packages --chown=node:node $HOME/app/node_modules $HOME/app/node_modules
COPY --from=builder --chown=node:node $HOME/app/dist $HOME/app/dist

RUN yarn db:generate

CMD ["node", "dist/src/main.js"]
