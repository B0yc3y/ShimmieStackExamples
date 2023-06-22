# Basic Shimmiestack Example Project

This is a bare-bones example project of how the ShimmieStack works.

This example is not production ready, as it provides no auth, logging, piibase etc.

I strongly suggest using the stack generics as they help catch payload errors as your events flow through the project, this example does use them

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