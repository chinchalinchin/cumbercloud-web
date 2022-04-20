# Cumberland Cloud Frontend

TODO

## Quickstart

### Development Server

```shell
cd app
npm install
ng serve
```

### Production Build

```shell
ng build --output-hashing none
```

## Deployments

This repository is kept in sync with a **AWS CodeCommit** repository that is hooked into a **AWS CodePipeline**. The current state of the frontend application is built on pushes to the **CodeCommit** `master` branch. **CodePipeline** pulls in the changes and pushes them to **AWS CodeBuild**. **CodeBuild** uses the *buildspec.yml* in the root of the repository to upload the build artifacts to an **S3** bucket, which in turn is served through a **CloudFront** distribution at [cumberland-cloud.com](https://cumberland-cloud.com).