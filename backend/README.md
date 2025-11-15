# Movie Night Backend

## Development

The project uses [tsx](https://tsx.is/) to run TypeScript. All the necessary
npm scripts are in package.json, but feel free to add any other if needed.
To interact with Knex, use `npm run knex` instead of using `npx knex` because
of the usage of the `tsx` library.

### Setup

To setup the project, first run the Docker container:
```sh
docker compose up
```

Then, install the dependencies:
```sh
npm install
```

Then, create the development database, migrate it and seed it:
```sh
npm run dev:db:create && npm run dev:db:migrate && npm run dev:db:seed
```

Then run the web app:
```sh
npm run dev
```

Then visit the [API documentation](http://localhost:3000/docs).

### Testing

First, setup the test database:

```sh
npm run test:db:create && npm run test:db:migrate
```

Then run the tests:

```sh
npm test
```
