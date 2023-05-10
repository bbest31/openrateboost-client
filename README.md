This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1.Install

### npm

```
npm i
or
npm i --legacy-peer-deps
```

### yarn

```
yarn install
```

## 2. Run in development mode

```sh
npm run start:dev
```

## 3.Build

### .env file

```
NODE_ENV=

PORT=3000

# HOST
REACT_APP_HOST_API_KEY=https://minimal-assets-api-dev.vercel.app

# SERVER
REACT_APP_API_SERVER=

#OTHER
REACT_APP_EXT_WEBPAGE=https://chrome.google.com/webstore/category/extensions

# AUTH0
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_AUTH0_AUDIENCE=
REACT_APP_AUTH0_AUDIENCE=
REACT_APP_AUTH0_SCOPE=read:current_user openid profile email read:current_user_metadata update:current_user_metadata read:user_idp_tokens update:user_metadata

# MIXPANEL
REACT_APP_MIXPANEL_TOKEN=
REACT_APP_MIXPANEL_PROXY=

#STRIPE
REACT_APP_STRIPE_PORTAL_URL=
```

```sh
npm run build or yarn build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## User Guide

You can find detailed instructions on using Create React App and many tips in [its documentation](https://facebook.github.io/create-react-app/).

## References

- [Axios](https://www.npmjs.com/package/axios)
- [Auth0 JS SPA](https://github.com/auth0/auth0-spa-js)
- [Auth0 React](https://github.com/auth0/auth0-react)
- [Minimals UI](https://docs.minimals.cc/introduction)
