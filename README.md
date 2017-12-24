# Clepsydra

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
We ejected to be able to customize the build process.

This is a Chrome extension.

## Build

- `yarn build`: generate the production build
- `yarn extension`: generate the development build


## Devtools

React and Redux provide devtools that connect to your application
and let you check the state, investigate events, etc.

These won't connect immediately to the chrome extension.
Some setup is required.

First install the local servers:

- `npm install -g remotedev-server`: local server for redux debugging
- `npm install -g react-devtools`: local server for react debugging

Start them:
- `remotedev --hostname=localhost --port=8096`: server for remote redux
- `react-devtools`: react devtool local

Back on your browser, the app should connect immediately to the
react devtools.

For redux,
1. right click on the extension icon, "open remote Devtools"
2. "settings", custom server,
3. use "localhost" and port "8096"

It should connect too.



