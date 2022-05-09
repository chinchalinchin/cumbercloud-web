<sup><sub>This article is part of the **Cumberland Cloud**'s [Building a Web Application with Angular]() series.</sub></sup>

# <span onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Angular on AWS</span>

<p align="center" class="article-header">
    <img src="/assets/svgs/icons/angular.svg" width="10%" height="auto">
</p>

## <span id="toc">Table of Contents</span>

- <span onclick="document.getElementById('cost-optimization').scrollIntoView()" class="link">Cost Optimization</span>
- <span onclick="document.getElementById('setup-prerequisites').scrollIntoView()" class="link">Setup Prerequisites</span>
  - <span onclick="document.getElementById('domain-hosted-zone').scrollIntoView()" class="link">Domain & Hosted Zone</span>
  - <span onclick="document.getElementById('tls-ssl').scrollIntoView()" class="link">SSL Certificate</span>
- <span onclick="document.getElementById('cloudformation').scrollIntoView()" class="link">CloudFormation</span>
  - <span onclick="document.getElementById('cloudformation-prerequisites').scrollIntoView()" class="link">CloudFormation Prerequisites</span>
- <span onclick="document.getElementById('anatomy-template').scrollIntoView()" class="link">Anatomy of Template</span>
  - <span onclick="document.getElementById('tldr').scrollIntoView()" class="link">TL;DR</span>
  - <span onclick="document.getElementById('template').scrollIntoView()" class="link">Template</span>
  - <span onclick="document.getElementById('parameters').scrollIntoView()" class="link">Parameters</span>
  - <span onclick="document.getElementById('s3-buckets').scrollIntoView()" class="link">S3 Buckets</span>
  - <span onclick="document.getElementById('cloudfront-distribution').scrollIntoView()" class="link">Cloudfront Distribution</span>
  - <span onclick="document.getElementById('route53-recordset').scrollIntoView()" class="link">Route53 Recordset</span>
  - <span onclick="document.getElementById('').scrollIntoView()" class="link">Outputs</span>
- <span onclick="document.getElementById('prerendering-problem').scrollIntoView()" class="link">Prerendering Problem</span>
  - <span onclick="document.getElementById('cloudfront-edge').scrollIntoView()" class="link">CloudFront Edge Functions</span>
  - <span onclick="document.getElementById('function-handler').scrollIntoView()" class="link">Function Handler</span>
- <span onclick="document.getElementById('series-index').scrollIntoView()" class="link">More Articles in _Building a Web Application with Angular_ series</span>

## Introduction

In this article we explain how to get an [Angular](https://angular.io/) application for your personal website up and running on the [AWS](https://aws.amazon.com/) cloud. We cover setting up your environment and provisioning all the resources you will need to deploy and run the **Angular** app. In a subsequent article in [this series](), we will cover [continuous integration and deployment](), i.e. creating a development pipeline so that changes to your **Angular** app can be automatically built and deployed anytime you push to your version control. We will use the environment detailed in this article later as a base upon which to build the complexity of [CI/CD](https://en.wikipedia.org/wiki/CI/CD).

Everything that follows assumes the reader is familiar enough with **Angular** to build and run an app on their local computer. If you are new to **Angular**, check out our [archive](/blog/archive) for previous articles in this series for more information on getting started.

## <span id="cost-optimization" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Cost Optimization</span>

**AWS** is a diverse eco-systems of disparate services and platforms. As such, there are many different approaches you can take to get an **Angular** app onto **AWS**; each method has its advantages and disadvantages, and depending on your situation, you may have reason to choose one over the other. You could provision an [Elastic Cloud Compute (EC2) instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) and install a lightweight web server like [nginx](https://www.nginx.com/) or [apache](https://httpd.apache.org/) onto it. If portability and scability are important for you, you might opt to deploy an image of a web server into a managed container using a service like [AWS Elastic Container Service (ECS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html). Or, if you're feeling adventurous, you might decide to go for broke and manage the cluster yourself with something like [AWS Elastic Kubernetes Service (EKS)](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) or [RedHat OpenShift on AWS (ROSA)](https://docs.aws.amazon.com/ROSA/latest/userguide/what-is-rosa.html). These are all viable solutions; indeed, you will often encounter these architectures in production. However, the needs of a production system are quite different from the needs of a personal website.

The [Cumberland Cloud](https://cumberland-cloud.com)'s guiding principle in architecting a cloud environment is simple: **cost** above all else. If a thing can be done cheaply without sacrificing quality, then we will always select the route with the least cost. The approaches detailed in the previous paragraph all suffer from one crucial defect: these methods quickly rack up charges. **EC2** and container orchestration clusters are always running and thus always incurring charges; if they are not managed properly, your bill can quickly get out of control.

We do not need the computing power of a full fledged web server (virtual or otherwise). All we need is to host some static files (i.e., the _HTML_, _JS_ and _CSS_ files that an **Angular** app transpiles down into when you `ng build`). [AWS Simple Storage Service (S3)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html) give us the ability to host a large quantity of static content for virtually free in a **S3 bucket**. We can then distribute the contents of the **S3 bucket** through a [global content distribution network](https://en.wikipedia.org/wiki/Content_delivery_network) **AWS** manages called [CloudFront](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-cloudfront-walkthrough.html).

The **Cumberland Cloud** website is written in **Angular** and this is the method we use to host our build files. We think the numbers speak for themselves. Last month, the entire bill for [https://cumberland-cloud.com](https://cumberland-cloud.com) was _$0.70_. By contrast, the lowest monthly charges you will find for an **EC2** are between _$18_ - _$30_, depending on the CPU and memory specifications. You would be lucky to find a [Content Management System (CMS)](), like **Wix** or **Wordpress**, with monthly hosting rates as low as that.

With those figures in mind, further justification for pursuing this route should not need given. In the sections that follow, we show how to setup a **S3**-**CloudFront** distribution you can use to host an **Angular** single page application.

## <span id="setup-prerequisites" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Setup Prerequisites</span>

There are several things you will need to set up manually in your **AWS** account before we proceed. These items are covered briefly in the sections below, with links to the relevant documentation provided for further investigation.

### <span id="domain-hosted-zone" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Domain & Hosted Zone</span>

You will need to purchase a domain name and set up a hosted zone for that domain. [When you register a domain through AWS Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html), AWS will automatically provision a hosted zone for you. However, if you already own a domain through a different registrar, you will need to [setup the hosted zone yourself](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/MigratingDNS.html) and point your DNS servers to **AWS**.

Once the hosted zone is provisioned and setup, note the physical ID for later. This can be found in the **Route53** web console,

<p align="center">
    <img src="/assets/imgs/articles/aws_hosted_zone_id.png" width="85%" height="auto">
</p>

### <span id="tls-ssl" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">TLS/SSL Certificate</span>

In order to setup a secure website through **HTTPS**, you will need a valid certificate from an authorized [Certificate Authority](https://en.wikipedia.org/wiki/Certificate_authority). Without a valid SSL certificate, visitors to your site will get a warning their connection is insecure and attackers may be trying to steal their information.

**AWS** issues its own certificates through the [AWS Cerfiticate Manager (ACM)](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html). The easiest way to setup **HTTPS** for your **S3-Cloudfront** distribution is to provision a certificate through the **ACM**. [Follow the instructions in the official documentation](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) to setup an SSL certificate.

If you registered `example.com` as your domain, then you will need to request a certificate for `*.example.com`. While not technically neccessary for the current scope, the wildcard will allow the certificate to valid any requests to subdomains within your domain, such as `api.example.com` or `app.example.com`. [In another article](), we show how to setup backend functionality for an **Angular** app via [AWS APIGateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) and [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html); if you use the wilcard, you will be able to use the same certificate as you follow along with all of our guides and tutorials.

Once the certificate is provisioned (this may take up to a day if your domain isn't registered through **Route53**), note the [AWS Resource Name (ARN)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) of the certificate in the **ACM** web console,

<p align="center">
    <img src="/assets/imgs/articles/aws_certificate_arn.png" width="85%" height="auto">
</p>

## <span id="cloudformation" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">CloudFormation</span>

After the domain and certificate have been provisioned in your **AWS** account, the hard part is over; It's smooth sailing from here on out. We provide a **CloudFormation** template below for provisioning the rest of the stack. Using either through the [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html), [AWS API](https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/Welcome.html) or the [AWS Console](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-console.html), you can upload this template to the cloud and **CloudFormation** will automatically create everything you need for an **S3**-**CloudFront** distribution.

[CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) is the **AWS** version of [Infrastructure-as-Code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code). _IaC_ uses [declarative programming](https://en.wikipedia.org/wiki/Declarative_programming) to automate and version control the environment on which a given application runs. Using [YAML](https://yaml.org/) syntax, you create _templates_ of a cloud environment by declaring a collection of resources, also known as a _stack_ of resources. Each resource is specified in a _block_ of code and has unique configuration properties that determine how the physical analogue of each block is mapped in the cloud, i.e. how much space a volume should allocate, how much memory an EC2 should provision, how many buckets should be created in **S3**, etc. The result is then uploaded to the **CloudFormation** API (<sup><sub>ultimately, the console and the CLI are just [wrappers](https://en.wikipedia.org/wiki/Wrapper_function) around the API</sub></sup>). **CloudFormation** parses the template, applies any intrinsic functions (covered in the <span onclick="document.getElementById('parameters').scrollIntoView()" class="link">Parameters</span> section) and then deploys the stack into your account.

_IaC_ templates can be committed to version control, just like regular code. This brings with it all the benefits application source code receives from version control: an immutable history of changes, the ability to roll back to previously committed configurations, a web hook for continuous deployment and integration, and much more. Perhaps the greatest benefit of all, though, is reusability. Once an _IaC_ has been created and debugged, it be can deployed into any account, at any time.

The **Cumberland Cloud** curates a repository of **CloudFormation** templates (<sup><sub>[found on our Github](https://github.com/chinchalinchin/cf-deploy.git)</sup></sub>). Over the years, we have accumulated templates for virtually every imaginable use case. Among the many templates we maintain, one of the first ones we ever created was the **S3**-**Cloudfront** distribution template. 

### <span id="cloudformation-prerequisites" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">CloudFormation Prerequisites</span>

Before procedding, make sure you [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [configure it with your account credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## <span id="anatomy-template" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Anatomy of a Template</span>

In this section, we describe in detail the anatomy of the **S3**-**Cloudfront** distribution **CloudFormation** template. If you're only interested in getting the stack deployed, you can clone our sample repository on [Github](https://github.com/chinchalinchin/cumbercloud-cloudformation) and use a script contained within to stand up the stack without hassle.

### <span id="tldr" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">TL;DR</span>

```bash
git clone https://github.com/chinchalinchin/cumbercloud-cloudformation
cd cumbercloud-cloudformation
./scripts/provision-stack
```

The script will prompt you to enter your domain name (without the _http://_ or _www._), the hosted zone ID, the SSL certificate ARN and a tag for the application namespace. The last argument is purely cosmetic and organizational; it will be appended to resources that are provisioned so they can be grouped together.

### <span id="template" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Template</span>

The raw **CloudFormation** template is given below. It can also be found [on the Cumberland Cloud Github](https://github.com/chinchalinchin/cumbercloud-cloudformation/blob/master/templates/web.yml).

```yaml
AWSTemplateFormatVersion: "2010-09-09"

Description: "Resources for hosting a website statically through an S3 bucket CloudFront distribution."

Parameters:
  applicationName:
    Type: String
    Description: Name of the web application
    Default: cumberland-cloud
  certificateArn:
    Type: String
    Description: ARN of the ACM certificate used to sign requests on the domain.
  hostedZoneId:
    Type: String
    Description: Physical ID of the hosted zone where the domain is being served.
  domainName:
    Type: String
    Description: Domain name that is hosting the application

Resources:
  WebsiteBucketLogs:
    Type: AWS::S3::Bucket
    DeletionPolicy: Delete
    Properties:
      AccessControl: LogDeliveryWrite
      BucketName: !Sub "${applicationName}-logs"

  WebsiteBucket:
    Type: AWS::S3::Bucket
    DeletionPolicy: Delete
    Properties:
      BucketName: !Sub "${applicationName}-web"
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: AES256
      LoggingConfiguration:
        DestinationBucketName: !Ref WebsiteBucketLogs
        LogFilePrefix: "log/"
      WebsiteConfiguration:
        IndexDocument: "index.html"

  WebsiteBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref WebsiteBucket
      PolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: "Allow"
            Action:
              - "s3:GetObject"
            Principal:
              CanonicalUser: !GetAtt WebsiteOriginAccessIdentity.S3CanonicalUserId
            Resource: !Sub "${WebsiteBucket.Arn}/*"

  WebsiteDistribution:
    Type: "AWS::CloudFront::Distribution"
    Properties:
      DistributionConfig:
        Aliases:
          - !Ref domainName
        Origins:
          - DomainName: !GetAtt WebsiteBucket.DomainName
            Id: !Ref WebsiteBucket
            S3OriginConfig:
              OriginAccessIdentity:
                !Join [
                  "",
                  [
                    "origin-access-identity/cloudfront/",
                    !Ref WebsiteOriginAccessIdentity,
                  ],
                ]
        DefaultCacheBehavior:
          AllowedMethods:
            - "HEAD"
            - "GET"
            - "OPTIONS"
          ForwardedValues:
            Cookies:
              Forward: none
            QueryString: true
          Compress: false
          SmoothStreaming: false
          TargetOriginId: !Ref WebsiteBucket
          ViewerProtocolPolicy: "redirect-to-https"
        PriceClass: "PriceClass_All"
        Enabled: true
        ViewerCertificate:
          AcmCertificateArn: !Ref certificateArn
          MinimumProtocolVersion: "TLSv1.2_2019"
          SslSupportMethod: "sni-only"
        HttpVersion: "http2"
        DefaultRootObject: "index.html"
        IPV6Enabled: true
        Logging:
          Bucket: !GetAtt WebsiteBucketLogs.DomainName
          IncludeCookies: false
          Prefix: "log/"

  WebsiteOriginAccessIdentity:
    Type: AWS::CloudFront::CloudFrontOriginAccessIdentity
    Properties:
      CloudFrontOriginAccessIdentityConfig:
        Comment: !Sub "CloudFront Origin Access Identity for ${applicationName}.${domainName}"

  WebsiteRoute53RecordSetGroup:
    Type: AWS::Route53::RecordSetGroup
    Properties:
      HostedZoneId: !Ref hostedZoneId
      RecordSets:
        - Name: !Ref domainName
          Type: A
          AliasTarget:
            DNSName: !GetAtt WebsiteDistribution.DomainName
            EvaluateTargetHealth: false
            # Specify Z2FDTNDATAQYW2. This is always the hosted zone ID when you create an
            # alias record that routes traffic to a CloudFront distribution.
            HostedZoneId: Z2FDTNDATAQYW2

Outputs:
  WebsiteBucketDistributionID:
    Value: !Ref WebsiteDistribution
    Description: Resource ID for CloudFront Distribution
    Export:
      Name: !Sub ${AWS::StackName}-WebsiteBucketDistributionID
  WebsiteBucketDomain:
    Value: !GetAtt WebsiteDistribution.DomainName
    Description: Domain name of CloudFront Distribution
    Export:
      Name: !Sub ${AWS::StackName}-WebsiteBucketDistributionDomain
```

The template is organized into four main blocks: `Description`, `Parameters`, `Resources` and `Outputs`. The `Description` block is a string of metadata that is appended to the stack; it serves no function other than describing to a human the purpose of the stack. Nothing in the `Description` block affects how or what gets provisioned. The other blocks, which are where the meat of the template is, are described below in more detail.

### <span id="parameters" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Parameters</span>

The `Parameters` block defines the input into a **CloudFormation** template. These values must be provided to the template anytime it is posted to **AWS**. If you use the **AWS** CLI, the `aws cloudformation create-stack` API command can ingest the parameters directly from the command line. The following command will provision the **S3**-**Cloudfront** template,

```bash
aws cloudformation create-stack \
          --stack-name "Angular-WebStack" \
          --template-body file://cloudformation.yml \
          --parameters ParameterKey=applicationName,ParameterValue=<application-name> \
                        ParameterKey=domainName,ParameterValue=<domain-name>\
                        ParameterKey=certificateArn,ParameterValue=<certificate-arn> \
                        ParameterKey=hostedZoneId,ParameterValue=<hosted-zone-id>
```

Replace `<application-name>`, `<domain-name>`, `<certificate-arn>` and `<hosted-zone-id>` with the corresponding values for your environment. 

The `aws cloudformation` command has several arguments. `--stack-name` is the identifier given to the stack. `--template-body` points the command to the location of the YML template. `--parameters` is a list of key-value pairs that is passed into the `Parameters` block of the template.

**NOTE**: The template, _cloudformation.yml_, must be saved in the directory _where this command is executed_. If you try to point this command to the location of the template, it will cause endless headaches as you struggle to figure out what the problem is.

Parameters allow you to generalize your template. You can parameterize any hardcoded values specific to your environment so your template can be reused in different accounts, or even different environments in the same account. In order to utilize parameters in a template, you must use one of the **CloudFormation** [intrinsic functions](), either the `Fn::Sub` (substitute function) or the `Fn::Ref` (reference function). Intrinsic functions are macros executed by **CloudFormation** before the template is processed. For example, the `Fn::Sub` intrinsic function substitutes the value of a parameter into a string expression, whereas the `Fn::Ref` references the value of a parameter.

The **S3**-**CloudFromation** template requires the following parameters,

1. **applicationName** : This is a tag that is used to enforce naming conventions. Note how the bucket resources substitute in the value of **applicationName** in for their bucket names using the `Fn::Sub` [instrinsic function](). It is a good practice to enforce naming and tagging conventions early on, before your accumulate too many resources without any organizational structure.

2. **certiicateArn** : This is the **ARN** of the SSL certificate you provisioned in a previous section. This is ingested by the `AWS::CloudFront::Distribution` resource through the `DistributionConfig.ViewerCertificate.AcmCertificateArn` property, using the `Fn::Ref` [instrinic function](). Note the difference in syntax between `Fn::Sub` and `Fn::Ref`. `Fn::Sub` injects the value of the parameter into a string, whereas `Fn::Ref` refers to a single value.

3. **hostedZoneId**: This is the phyiscal ID (not the **ARN**!) of the Hosted Zone for your domain. It is ingested through the `HostedZoneId` property of the `AWS::Route53::RecordSetGroup` using the `Fn::Ref` intrinsic function.

4. **domainName**: This is the domain name you registered in or transferred to **Route53**. Do not include the _https://_ or _www_ in the value.

### <span id="s3-buckets" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">S3 Buckets</span>

The first two resources we configure are both instances of `AWS::S3::Bucket`. The first bucket, `WebsiteBucketLogs`, is an archive for access log files. Any time users enter your website, logs will be generated and stored in this bucket as raw text files. While not as featured or useful as a full-fledged log service like [Datadog](https://www.datadoghq.com/) or [Splunk](https://www.splunk.com/), it is better than nothing and **AWS** does have tools, such as [Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html), for querying directly against **S3** bucket objects should you find yourself in situation where you need to search through thousands of logs for a specific date, time or IP. 

The second bucket, `WebsiteBucket`, is where the actual website files will be hosted. This is where you will upload the artifacts of `ng build`.


### <span id="cloudfront-distribution" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Cloudfront Distribution</span>

TODO

### <span id="route53-recordset" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Route53 Recordset</span>

TODO

### <span id="outputs" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Outputss</span>

TODO

## <span id="prerendering-problem" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">The Problem With Prerendering</span>

If you are building the **Angular** app with `ng build`, at this point, you have a fully functional website. You can stop reading, upload the contents of the _dist_ folder to your **S3** bucket and call it a day. However, you may have a project on your hands that requires prerendering.

One of the major drawbacks of a [Single Page Application (SPA)]() is it renders client-side, meaning the application doesn't fully construct the [Document Object Model (DOM)]() (i.e. the HTML document structure) until the files have been delivered over the internet to the user's computer; Javascripts that run locally on the user's browser construct the majority of the webpage. This presents a problem to web crawlers, like [Googlebot](), that rely on the **DOM** and static content to index websites. While web crawlers have made strides in recent years with rendering javascript, **SPA**s are still effectively invisible to most search engines, if additional steps are not taken.

This is where the concept of _prerendering_ comes into play. [Angular Universal]() is a library that renders **Angular** applications server side before they are distributed over the internet. (For more information on implementing **Angular Universal** and _prerendering_ in your app, see [the tutorial found here]()) By \*_prerendering_, the webpages are fully formed before the user ever requests to see them. This allows web crawlers and search engines to find your site.

However, in typical fashion, this presents another problem. Luckily, there is a nice, neat, out-of-the-box solution for this particular problem.

When an **Angular** application is prerendered, it will generate an _index.html_ for each route, as opposed to a normal **Angular** build that compiles a singe _index.html_ and bootstraps the entire application from that entrypoint. In order to accomodate this difference, the **CloudFront** distribution will need to be setup to append `index.html` to the end of all routes, so that will be serve the correct index on each path. If unchanged, the default configuration will serve the root _index.html_ and then pass the routing to the **Angular** app, instead of loading that route's _index_ and bootstrapping from there. This would effectively make the _prerendering_ process moot, since the static html generated by the prerender would not be served by the **Cloudfront** distribution.

### <span id="cloudfront-edge" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">CloudFront Edge Functions</span>

To solve this problem, we will use **Cloudfront** [edge functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html). **Cloudfront edge functions** are middleware that execute on \*_AWS_ before an incoming requests is received or after an outgoing response is processed.

You will need to set up **CloudFront** edge functions to append _index.html_ to the [end of each route that is missing an index.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html).

### <span id="function-handler" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Function Handler</span>

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith("path")) {
    request.uri += "/index.html";
  } else if (uri.endsWith("path/")) {
    request.uri += "index.html";
  }
  return request;
}
```

## <span id="series-index" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Building a Web Application with Angular</span>

- [Angular Prerendering]()
- [Angular Search Engine Optimization]()
- [Angular Continuous Integration and Deployment]()
