# CodeIgniter React Boilerplate

> A CodeIgniter 3 boilerplate with ReactJS and Admin Pro.

## Installation

Clone the repository and run the command below to install node dependencies.  

```sh
npm install or yarn install
```

## Usage

```sh
yarn or npm run [command]
```

Example :

```sh
yarn run dev
```
And then do this command to start php server: 
```sh
php -S localhost:8000
```

| Command          | Description                                       |
|------------------|---------------------------------------------------|
| `yarn install`   | Install the dependencies                          |
| `yarn run dev`   | Start development mode and watch for file changes |
| `yarn run build` | Generates the minified file ready for production  |

## Create new components

Go to the "src/components" folder, create a new component. Then add it in the app.js file.

Check the "Welcome" controller and the "welcome_message" view as well to see how to load the components.

If is not clear yet, check the "util_helper" for more info.

## Requirements

The project have been tested using the versions below:

- PHP version 7.4.12
- Node version v12.18.3
- Yarn version 1.22.5

## Contributing

Fork the repository, modify it and make a pull request.

## License

MIT
