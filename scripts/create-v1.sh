#!/bin/bash
# Lerna will not publish v1.0.0 automatically, so we need to do it manually
# https://lerna.js.org/docs/features/version-and-publish#fixedlocked-mode-default
# https://semver.org/#spec-item-4
# TODO delete me after publishing v1.0.0

function cleanInstall() {
  # Clean dependencies and build artifacts
  bun run special:clean && rm -rf ./**/dist packages/generator-ds/generators

  # Clean-install and build/test
  bun install
  bun run check
  bun run test
}

function gitUpdate() {
  git add .
  git commit -m "chore(release): publish v1"
  git tag v1.0.0 -m v1.0.0
  git push && git push --tags
}

function applyVersioning() {
  # Set each package version to 1.0.0, and generate changelogs.
  bun run lerna version 1.0.0 --conventional-commits --no-push --no-git-tag-version --force-publish --yes
  # Apply formatting fixes to `package.json` files.
  bun run check:fix
}

cleanInstall
applyVersioning
gitUpdate
cleanInstall
bun run lerna publish --no-private from-package