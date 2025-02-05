## Publishing Packages

This repository is currently configured to publish packages to [NPMJS](https://npmjs.org).
[Lerna](https://lerna.js.org) is used to version and publish packages.

### GitHub Actions Workflow

This repository houses numerous packages, and controls multiple release artefacts.
The versioning workflow does the following:

- Analyses each package to see if it has been updated since its last publish.
- Increments each updated package by a semver level chosen according to
  the [conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/)
    - If a package has a dependency that is updated, it will also be incremented by the same semver level.
- Commits the version changes to the `main` branch
- Commits a new tag
- Publishes the affected packages

#### Running the workflow

Open the [Tag workflow action](https://github.com/canonical/ds25/actions/workflows/tag.yml).
Click the "Run workflow" button to open a workflow triggering window.

- Release type: The level of stability of this release. If a prerelease (anything that is not "stable") is chosen for
  update type, this is used as the prerelease identifier (e.g., 0.0.1-rc.1).
  - Please note that all versions prior to 1.0.0 are considered breaking changes. There is no need to specify a breaking change release type for versions prior to 1.0.0.
  - To update to 1.0.0, see the [V1.0.0](#v100) section below.
    - If you choose a stable release type and there are breaking changes, the publish action will fail until the version is manually bumped to 1.0.0 to prevent creating v1+ prerelease versions.

#### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to determine the version bump for each
package.
`lerna version` [accepts a
`--conventional-commits` flag](https://github.com/lerna/lerna/tree/c3e601bee1bd6416e8b067ec8121abd996163d86/libs/commands/version#--conventional-commits)
that enables this behavior.

##### Change levels

When packages are versioned, the new version is determined by the 
highest level of semantic change for that package since the last release.

Level of change is determined by examining commit messages since the last release.
The following table shows the level of change for each commit type:

| Commit Type                                  | Level of Change |
|----------------------------------------------|-----------------|
| fix                                          | patch           |
| feat                                         | minor           |
| BREAKING CHANGE (in commit body/description) | major           |
| other (such as chore)                        | none            |

We use Lerna's [fixed versioning strategy](https://lerna.js.org/docs/features/version-and-publish#fixedlocked-mode-default), 
so all packages that are updated will be bumped to the same version. 
Note that **this does not mean that all packages will always have the same version**. 
Packages that are versioned at the same time are always bumped to the same version, 
but packages that are not updated will not be bumped.
There are two exceptions to this rule:
1. If any of a package's internal dependencies are bumped, the package will be bumped to the same version as the dependency.
2. If any package has a breaking change, all packages will be bumped to the next major version.

##### PR Titles / Commit Messages

In order to enforce semantic commits, we apply a [PR title check](https://github.com/amannn/action-semantic-pull-request) 
that ensures PR titles follow the conventional commits spec.
This way, when a PR is squash-merged, the commit message will be formatted correctly.

It is the responsibility of the upstream maintainer to ensure that PR titles are formatted correctly at merge time, 
and to add "BREAKING CHANGE:" to the squash-merge commit body if necessary.

##### Changelogs

Lerna generates `CHANGELOG.MD` files for each package that is updated, and the repository root.
Each version includes a list of commits that are included in the release.

Here is an example of a changelog entry:

```markdown
## <small>0.3.1-experimental.0 (2024-12-04)</small>

* Add baseline grid toggle to Storybook ([cbbcecc](https://github.com/canonical/ds25/commit/cbbcecc))
* Add negative button, move variants to global intents ([78fe56c](https://github.com/canonical/ds25/commit/78fe56c))
* Added basic heading styles ([f5848d2](https://github.com/canonical/ds25/commit/f5848d2))
* Update intent definitions to include neutral and improve style inheritance and overriding ([cb56369](https://github.com/canonical/ds25/commit/cb56369))
```

##### V1.0.0

Lerna follows the [SemVer spec](https://semver.org/#spec-item-4) for versioning. This means that the first stable release of a package should be `1.0.0`.
All updates before 1.0.0 are considered breaking.

Lerna will not bump to version 1.0.0 unless specifically requested. BREAKING CHANGE commits will not cause a MAJOR level update until 
the project is manually bumped to 1.0.0.

To update to 1.0.0, run [`./scripts/create-v1.sh`](../scripts/create-v1.sh) and follow the prompts.

#### NPM Token

The `NODE_AUTH_TOKEN` GitHub secret is used to publish to NPM.

To generate a new publishing token:

1. Make sure you have read-write access to the [@canonical](https://www.npmjs.com/org/canonical) NPM organisation.
2. Go to
   the [Granular access tokens page](https://www.npmjs.com/settings/<NPM_USERNAME>/tokens/granular-access-tokens/new).
   Replace `<NPM_USERNAME>` in this URL with your NPM username.
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
