jpex
====

[![Build Status](https://travis-ci.com/alexcr/jpex.svg?token=nq2T7qKyBHDEmZjPe4Cj&branch=master)](https://travis-ci.com/alexcr/jpex)

JPEX (JSONPath Explorer) is a web application that allows users to query a JSON object using JSONPath with an instant and beautiful visualization.

## Demo

The app is live at [jpex.cloud](https://jpex.cloud/) (hosted by AWS).

## Strategy

JPEX was built to support huge JSON files. Since rendering is the most expensive operation for a component that can draw a tree with thousands of nodes, this app uses **virtualized lists** to render only the nodes that are currently on screen. To achieve that, the JSON object is first parsed and converted to a flat list of nodes. Each list node contains enough information to allow the components to render them as a tree, including depth and collapsible state. It also stores an object that maps each path to its node index in the list, so as to reduce computation time when parsing huge JSON objects.

This app was tested with JSON files with 50k objects (around 70MB of data).

## Stack

### Main technologies

* **React** to render the web app, created with **create-react-app**
* **mobx** as state manager and **mobx-react-lite** to integrate it with React
* **styled-components** to style components using Javascript
* **jest** and **enzyme** for unit tests and snapshot tests
* **TravisCI** for continuous integration

### Other libraries

* **jsonpath** library to parse the JSON object for a given JSONPath query string and list all matching paths
* **react-window** to render virtualized lists
* **react-delay-input** to easily debounce change callbacks for the query input field and wait some miliseconds while user is still typing
* **react-dropzone** to easily provide a Drag & Drop zone to upload the JSON files

## Run it locally

```bash
# Install using npm:
$ npm install

# Run the web server:
$ npm start

# Run the tests:
$ npm test
```

## What's next?

Some steps can be taken to further improve performance and UX:
* Show loading indicator while parsing new JSON files
* Use Web Workers to run expensive operations in the background

## Links for external documentation

* [JSON](https://www.json.org/)
* [JSONPath](https://restfulapi.net/json-jsonpath/)

## License

[MIT](LICENSE)
