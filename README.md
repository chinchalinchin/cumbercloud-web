# Cumberland Cloud Web

**TODO**: introduction

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

### Provisioning

All of the resources to host, deploy and update this web application are contained as **nfrastructure-as-code** within the *cloudformation.yml* in the repository root. This template can be posted to **CloudFormation** and will provision a **CloudFront** distribution, several **S3** buckets, a **CodeCommit** repository, a **CodeBuild** project, a **CodePipeline** pipeline and several other resources to glue the whole environment together. The following diagram illustrates the architecture captured in this template,

**TODO**: diagram of architeture

If you have the [AWS CLI]() installed and configured, you can use the script `./scripts/provision-stack` to provision all the resources necessary to host and continously update the web application stored in this repository,

```shell
./scripts/provision-stack
```

This script will read in several key pieces of information. Before executing this script, you must own a domain on **AWS** through [Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html). You will need the [hosted zone id](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ListInfoOnHostedZone.html) associated with your domain. In addition, in order to setup HTTPS with the **CloudFront** distribution, you will need to purchase a SSL certificate from the [AWS Certificate Manager](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html). The script will require the AWS Resource Number (**ARN**) of the certificate.

