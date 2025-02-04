#!/bin/bash

# Follows https://github.com/lerna/lerna/tree/c3e601bee1bd6416e8b067ec8121abd996163d86/libs/commands/version#generating-initial-changelogs

# Lerna does not actually use conventional-changelog-cli, so you need to install it temporarily
bun add -D conventional-changelog-cli --ignore-scripts


# Create root-level changelog
bun run conventional-changelog --preset angular --release-count 0 --outfile ./CHANGELOG.md --verbose
# Create package-level changelogs
bun run lerna exec --concurrency 1 --stream -- 'conventional-changelog --preset angular --release-count 0 --commit-path $PWD --pkg $PWD/package.json --outfile $PWD/CHANGELOG.md --verbose'

# Remove temporary dependency
bun remove conventional-changelog-cli --ignore-scripts
