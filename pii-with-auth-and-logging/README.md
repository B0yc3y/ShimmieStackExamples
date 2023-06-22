# Shimmiestack Pii Example Project

This is an example project of how the ShimmieStack works.

This example is not production ready, as it provides no persistence. 
However, it does demo how to set up many of the production necessities. 

These include authorisation, authentication, piibase, custom logging and custom error handling

The piiBase accepts any fields marked as Pii and stores them in a separate store. 
This allows for easier GDPR cleanup, without having to edit the eventstore.

To run the stack
```shell
npm i
# For dev/hot reload
npm run dev
# For prod builds
npm run build && npm run start
```

To test the stack
```shell
npm t
```

When no authorizer function is provided on an API, the stack will warn you.
```shell
Error: Authorization Not Implemented for Example Command at /example
    at file://ShimmieStackExamples/pii-with-auth-and-logging/node_modules/shimmiestack/routes.js:37:23
    at Array.forEach (<anonymous>)
    at Module.mountApi (file://ShimmieStackExamples/pii-with-auth-and-logging/node_modules/shimmiestack/routes.js:30:21)
    at Object.mountProcessor (file://ShimmieStackExamples/pii-with-auth-and-logging/node_modules/shimmiestack/index.js:161:32)
    at file://ShimmieStackExamples/pii-with-auth-and-logging/dist/src/index.js:25:6
```
To resolve this, add an `AuthorizerFunc` into your middleware on the API. 