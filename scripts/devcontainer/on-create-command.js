#!/usr/bin/env -S zx

try {
  await $`yarn`;
} catch (err) {
  console.error(err);
}
