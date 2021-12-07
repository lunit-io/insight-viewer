# Lunit Front-End Packages

This repository is a monorepo managed using yarn workspaces, typescript, and lerna.  
Each public sub-package is independently published to NPM.

## Docs

- [https://insight-viewer.s.lunit.io/](https://insight-viewer.s.lunit.io/)

## Project structure

- [`packages`](./packages) - Node packages.
- [`apps`](./apps) - Applications that use packages

### Packages

- [`packages/insight-viewer`](./packages/insight-viewer) - Cornerstone.js medical image viewer component for React.

### Apps

- [`packages/insight-viewer-docs`](./apps/insight-viewer-docs) - Documentation site for @lunit/insight-viewer.

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
}
```

And then in the root, `$ yarn` again. All dependencies are hoisted.

## When adding project, check this out

### workspace name scope

project.json

```json
{
  "name": "@lunit/{PROJECT_NAME}"
}
```

### typescript project reference

```json
{
  "references": [
    {
      "path": "../../packages/{PACKAGE_NAME}/tsconfig.build.json"
    }
  ]
}
```
