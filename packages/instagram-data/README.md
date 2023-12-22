# Instagram Data

Instagram Data is a wrapper for Instagram's GDPR data export. It provides a convenient way to interact with the data provided by Instagram.

## Installation

To install the package, you can use npm or yarn:

```sh
npm install instagram-data
```

or

```sh
yarn add instagram-data
```

## Usage

First, import the InstagramData class from the package:

```typescript
import InstagramData from 'instagram-data';
```

Then, you can create an instance of the class and initialize it with a file:

```typescript
const instagramData = new InstagramData();
instagramData.init(file);
```

The init method is asynchronous and needs to be awaited. It takes a `File` object, which should be the zipped data export provided by Instagram.

## API

The InstagramData class provides the following properties:

- followers: An array of relationships representing the followers of the user.
- following: An array of relationships representing the users that the user is following.

Each relationship object has the following properties:

- username: The username of the user in the relationship.
- timestamp: The timestamp of when the relationship was established.

## Building

To build the package, you can use the build script in the package.json file:

```sh
npm run build
```

This will compile the TypeScript code to JavaScript and output it to the `dist` directory.

## Testing

The package uses Karma and Jasmine for testing. You can run the tests with the following command:

```sh
npm run test
```

## License

This package is licensed under the MIT License. For more details, see the [LICENSE](packages/instagram-data/LICENSE) file.