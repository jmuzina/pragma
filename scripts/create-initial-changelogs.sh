#!/bin/bash
# This script generates retroactive changelogs for a monorepo with Lerna and Conventional Commits.
# It allows projects that are not currently using Conventional Commits to generate changelogs for their existing commit history.
# This script is intended to be run once, just before the first release after adopting Conventional Commits versioning.
# Follows https://github.com/lerna/lerna/tree/c3e601bee1bd6416e8b067ec8121abd996163d86/libs/commands/version#generating-initial-changelogs

# Clean dependencies and build artifacts
bun run special:clean && rm -rf ./**/dist packages/generator-ds/generators

# Clean-install and test before generating changelogs
# These instructions are specific to the DS-25 project and can be removed or modified as needed.
bun install --ignore-scripts
bun run check
bun run test

# Lerna does not actually use conventional-changelog-cli, so you need to install it temporarily
bun add -D conventional-changelog-cli --ignore-scripts

# Create root-level changelog
bun run conventional-changelog --preset angular --release-count 0 --outfile ./CHANGELOG.md --verbose
# Create package-level changelogs
bun run lerna exec --concurrency 1 --stream -- 'conventional-changelog --preset angular --release-count 0 --commit-path $PWD --pkg $PWD/package.json --outfile $PWD/CHANGELOG.md --verbose'

# Remove temporary dependency
bun remove conventional-changelog-cli --ignore-scripts
