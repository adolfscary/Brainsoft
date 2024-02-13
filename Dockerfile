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

COPY package.json yarn.lock .npmrc .yarnrc.yml $HOME/app/

RUN yarn

# ----------------------------------------
FROM base as builder

ENV HOME /home/node

WORKDIR $HOME/app

COPY --from=dev_packages --chown=node:node $HOME/app/node_modules $HOME/app/node_modules
COPY package.json yarn.lock .npmrc .yarnrc.yml .eslintrc.cjs .prettierrc.json nest-cli.json tsconfig.json tsconfig.build.json prisma src $HOME/app/

RUN yarn db:generate
RUN yarn build

# ----------------------------------------
FROM base_slim as prod

ENV HOME /home/node
ENV NODE_ENV production

WORKDIR $HOME/app

COPY package.json yarn.lock .npmrc .yarnrc.yml nest-cli.json prisma tsconfig.json src $HOME/app/
COPY --from=builder --chown=node:node $HOME/app/dist $HOME/app/dist

RUN yarn
RUN yarn db:generate

CMD ["npm", "start"]
