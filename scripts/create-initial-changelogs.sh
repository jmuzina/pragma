#!/bin/bash

# Follows https://github.com/lerna/lerna/tree/c3e601bee1bd6416e8b067ec8121abd996163d86/libs/commands/version#generating-initial-changelogs
# TODO delete me after publishing initial changelogs

function cleanInstall() {
  # Clean dependencies and build artifacts
  bun run special:clean && rm -rf ./**/dist packages/generator-ds/generators

  # Clean-install and test
  bun install --ignore-scripts
  bun run check
  bun run test
}

function createChangelogs() {
  # Lerna does not actually use conventional-changelog-cli, so you need to install it temporarily
  bun add -D conventional-changelog-cli --ignore-scripts

  # Create root-level changelog
  bun run conventional-changelog --preset angular --release-count 0 --outfile ./CHANGELOG.md --verbose
  # Create package-level changelogs
  bun run lerna exec --concurrency 1 --stream -- 'conventional-changelog --preset angular --release-count 0 --commit-path $PWD --pkg $PWD/package.json --outfile $PWD/CHANGELOG.md --verbose'

  # Remove temporary dependency
  bun remove conventional-changelog-cli --ignore-scripts
}

function applyVersioning() {
  bun run lerna version prepatch --conventional-commits --no-push --no-git-tag-version --yes
  bun run check:fix
}

function gitUpdate() {
  git add .
  git commit -m "chore(ci): Create initial conventional changelogs"
  git push origin initial-changelogs
}

git stash
git fetch upstream
git checkout -b initial-changelogs upstream/main

cleanInstall
createChangelogs
applyVersioning
gitUpdate

echo "Initial changelogs created. Please open a pull request to merge initial-changelogs into main."
echo "After merging, run a version update action to publish the changelogs."
