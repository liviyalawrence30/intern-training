# package.json notes
## name
The name field specifies the name of the project or package.
## version
the version field indicates the current version of the project.
## description
the description field provides a short summary of the project.It helps others understand the purpose of the project.
## main
The main field specifies the entry point of the application.It is the first file Node.js executes when the package is imported.
## scripts
The scripts field contains the commands that can be executed using npm.These commands help automate the development tasks.
## keywords
The keywords field contains a list of words that makes the package easier to discover on npm.
## author
The author field specifies the person or organization that created the project.
## license
The license field defines how others are allowed to use, modify, and distribute the project.


## npm scripts
npm scripts provide simple shortcuts for running commands.
In a team, everyone can use the same commands.
It saves time, reduces errors, and keeps the workflow consistent.

## Dependencies and devDependencies
dependencies contain packages that are required for the application to run in production.

devDependencies contain packages that are only needed during development,testing or debugging.
They are not required for the application to run in production.

## nodemon
nodemon automatically restarts the application whenever the source code changes. 
It is a development tool that helps developers work more efficiently, but it is not needed when the application is deployed or running in production.

## package.json vs package-lock.json

package.json contains information about the project, such as its name, version, scripts, and the packages the project depends on.

package-lock.json records the exact versions of all installed packages and their dependencies. 
This ensures that everyone working on the project installs the same versions, making the application behave consistently across different systems.


## __dirname and __filename

__dirname gives the absolute path of the current directory.

__filename gives the absolute path of the current file.

They are available in CommonJS modules (`require`), but not in ES Modules (`import/export`) because ES Modules use a different module system.

In ES Modules, the alternative is to use `import.meta.url` along with the `url` and `path` modules to get the file and directory paths.

## npm install vs npm ci

npm install installs dependencies and updates `package-lock.json` if needed. It is used during development.

npm ci installs the exact versions from `package-lock.json` without modifying it. It is mainly used for CI/CD and production to ensure consistent installations.