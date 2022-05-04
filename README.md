# Instructorstudio
A simple app for instructors to manage, present and sell their courses. (It will work in both, portrait and landscape.)

## Installation
Configure the environmental placeholders in the example `.env.example` file to your liking or leave them as they are, rename the file to `.env` and choose to run one of the following commands:

_For development:_
```sh
$ docker-compose -f docker-compose.dev up
```
The development composition includes the npm devDependencies [nodemon](https://www.npmjs.com/package/nodemon) (reloading) and [standard](https://www.npmjs.com/package/standard) (linting & fixing) as well as a [mongo-express](https://github.com/mongo-express/mongo-express) admin interface for the [mongo database](https://github.com/mongodb/mongo), which will initialize with some demo content.

_For production:_
```sh
$ docker-compose -f docker-compose.prd up
```
The production composition will run a streamlined and optimized version of this application with an empty database.

In both cases the application will be accessible at [http://localhost:3000](http://localhost:3000).
The mongo-express interface (development only) will be accessible at [http://localhost:8081](http://localhost:8081/).

## Commands
`npm run lint` - lint with [standard](https://www.npmjs.com/package/standard)

`npm run format` - fix with [standard](https://www.npmjs.com/package/standard) (works very well with the vscode [extension](https://marketplace.visualstudio.com/items?itemName=standard.vscode-standard))

## API
The API has some advanced (at least for my level) features:

- Basic key filtering
- More advanced key filtering (less than, greater than...)
- Sorting (with multiple criterias)
- Limiting the output to specific keys
- Pagination

To test the API and its features there is a `insomnia-example-queries.json` file in the root folder that contains a collection of example requests to be imported into your [Insomnia](https://insomnia.rest/) client.
## Project Roadmap
The following enhancements are already a work in progress and hopefully within the next 2 weeks I will:

- Add a lot of functionality to the application. Instructors will be able to create courses and classes, users will be able to attend, rate and review courses.
- Refactor API components
- Add [passport](https://github.com/jaredhanson/passport) authentication
- Add a nice looking [vue](https://github.com/vuejs/core) frontend
- Improve error handling
- Add [jest](https://github.com/facebook/jest) with thoughtful test scripts
- Add [lint-staged](https://github.com/okonet/lint-staged) so git hooks will be limited to staged files
- Deploy the application to [Google Cloud Run](https://cloud.google.com/run)
- Ask Armagan and Steve for forgiveness
