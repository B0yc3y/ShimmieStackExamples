# Shimmiestack object versioning Example Project

This is an example project of how the ShimmieStack works.

This example is not production ready, as it provides no persistence. 
However, it does demo to use object versioning to ensure you are always acting on the most up to date state. 

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

# for integration tests (against a postgres) install docker compose and run the below.
docker compose up -d
npm run test-int
```
