## Publishing Packages

This repository is currently configured to publish packages to [NPMJS](https://npmjs.org).
[Lerna](https://lerna.js.org) is used to version and publish packages.

### GitHub Actions Workflow

This repository houses numerous packages, and controls multiple release artefacts.
The versioning workflow does the following:

- Analyses each package to see if it has been updated since its last publish.
- Increments each updated package by a semver level chosen according to the [conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/)
  - If a package has a dependency that is updated, it will also be incremented by the same semver level.
- Commits the version changes to the `main` branch
- Commits a new tag
- Publishes the affected packages

#### Running the workflow

Open the [Tag workflow action](https://github.com/canonical/ds25/actions/workflows/tag.yml).
Click the "Run workflow" button to open a workflow triggering window.

- Release type: The level of stability of this release. If a prerelease (anything that is not "stable") is chosen for update type, this is used as the prerelease identifier (e.g., 0.0.1-rc.1).

#### NPM Token

The `NODE_AUTH_TOKEN` GitHub secret is used to publish to NPM.

To generate a new publishing token:

1. Make sure you have read-write access to the [@canonical](https://www.npmjs.com/org/canonical) NPM organisation.
2. Go to the [Granular access tokens page](https://www.npmjs.com/settings/<NPM_USERNAME>/tokens/granular-access-tokens/new). Replace `<NPM_USERNAME>` in this URL with your NPM username.
3. Set the expiration to 1 year.
4. Set the package scopes to "Read and write" for the `@canonical` organisation.

The tokens last for 1 year. The current token will expire on 3 November 2025.

#### Formatting

`lerna version` currently applies some JSON formatting to `package.json`.
Without intervention, this casues Biome's linting to fail due to formatting errors.

To resolve this, we execute `bun run check:fix` after writing package updates
and before committing the new tag to avoid pushing a tag that will fail linting.

This has been filed as a bug with Lerna [here](https://github.com/lerna/lerna/issues/4117).
The issue includes an example for issue reproduction.
