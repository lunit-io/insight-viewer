# Lunit Front-End Packages

**Note:** Are you searching for `@lunit/*` packages? Check out [3.x branch](https://github.com/lunit-io/frontend-components/tree/3.x).

This repository is a monorepo managed using yarn workspaces, typescript, and lerna.  
Each public sub-package is independently published to NPM.

## Docs

[3.x](https://frontend-components.now.sh/) | [4.x (WIP)](#)

## Project structure

- [`packages`](./packages) - Node packages.
- [`apps`](./apps) - Applications that use packages

### Packages

- [`packages/insight-viewer`](./packages/insight-viewer) - Cornerstone.js medical image viewer component for React.

### Apps

- [`packages/insight-viewer-demo`](./packages/insight-viewer-demo) - Documentation site for @lunit/insight-viewer.

## Install

1. Clone this repository locally `$ git clone git@github.com:lunit-io/frontend-components.git`
2. Install the dependencies. Inside the root `$ yarn`

## Building, running, linting & tests

```sh
// build all packages/apps
$ yarn run build
// test all packages/apps
$ yarn run test
```

## Building documentation:

```sh
// build documentation. Currently there is only "insight-viewer" project.
$ yarn run doc
```

## Dependency management

### Add a devDependency to the root of the workspace

```sh
$ yarn add <package name> -WD
```

### Add a sibling package as a dependency to a package/app

package.json

```json
"dependencies": {
    "@lunit/<package name>": "<package version>"
  }
```

### Add a dependency/devDependency to a package/app

```sh
$ yarn workspace @lunit/<package_or_app_name_to_be_added_to> add <package_name_to_add...> [-D]
```

## Use Create-React-App

```sh
$ cd apps
$ yarn create react-app <app name>
```

Remove yarn.lock and node_modules folder from the newly genereated CRA project.
Add a project name to package.json

```json
{
  "name": "@lunit/<app name>"
  // ...
}
```

And then in the root, `$ yarn` again. All dependencies are hoisted.
