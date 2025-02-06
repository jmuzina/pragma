#!/bin/bash

# Check if release_type argument is provided
if [ -z "$1" ]; then
  echo "Error: release_type argument is required."
  exit 1
fi

release_type="$1"

OLD_VERSION=$(jq -r '.version' lerna.json)

# If a stable prerelease identifier is given, graduate the version to stable
if [ "$release_type" == "stable" ]; then
  VERSION_ARGS="--conventional-graduate"
# Add the prerelease identifier and signal lerna to bump pre-release version instead of the main version
# For example, if release_type is "experimental" and cur version is 0.0.1-experimental.0, bump to 0.0.1-experimental.1 instead of 0.0.1
else
  VERSION_ARGS="--preid $release_type --conventional-prerelease"
fi

# Run lerna version with the specified arguments
# Do not commit or tag as we need to re-format the package files before committing
bun run lerna version --conventional-commits $VERSION_ARGS --no-git-tag-version --no-push --yes

NEW_VERSION=$(jq -r '.version' lerna.json)

if [ "$OLD_VERSION" == "$NEW_VERSION" ]; then
  echo "No version changes detected. Exiting."
  exit 1
# Protect against unexpected major version bumps during project initialization
# TODO this should be removed after 1.0.0 is released, so that we can release pre-releases of major versions like 2.0.0-rc-0.
elif [ "$release_type" != "stable" ]; then
  OLD_MAJOR=$(echo "$OLD_VERSION" | cut -d. -f1)
  NEW_MAJOR=$(echo "$NEW_VERSION" | cut -d. -f1)
  if [ "$NEW_MAJOR" -ne "$OLD_MAJOR" ]; then
    echo "Unexpected major version bump detected. Exiting."
    exit 1
  fi
fi

echo "VERSION=$NEW_VERSION" >> "$GITHUB_OUTPUT"