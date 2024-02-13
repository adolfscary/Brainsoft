#!/usr/bin/env -S npx tsx

import { $ } from "zx";

await $`git config --global --add safe.directory /home/node/app`;

await $`
if [[ -f ~/.devcontainer/.npmrc ]]; then
    ln -s /root/.devcontainer/.npmrc ~/.npmrc
fi

if [[ -f~/.devcontainer/.gitconfig ]]; then
    echo "$(cat ~/.gitconfig; echo; cat ~/.devcontainer/.gitconfig)" > ~/.gitconfig
fi

if [[ -n "\${GIT_USER_NAME}" ]]; then
    git config --global user.name "\${GIT_USER_NAME}" 
fi

if [[ -n "\${GIT_USER_EMAIL}" ]]; then
    git config --global user.email "\${GIT_USER_EMAIL}" 
fi
`;

await $`yarn db:push`;
await $`yarn db:seed`;
