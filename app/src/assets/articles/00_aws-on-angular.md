<sup><sub>This article is part of the **Cumberland Cloud**'s [Building a Web Application with Angular]() series.</sub></sup>

<span id="toc">Table of Contents</span>
-----------------
- <span onclick="document.getElementById('cost-optimization').scrollIntoView()" class="link">Cost Optimization</span>
- <span onclick="document.getElementById('setup-prerequisites').scrollIntoView()" class="link">Setup Prerequisites</span>
    - <span onclick="document.getElementById('domain-hosted-zone').scrollIntoView()" class="link">Domain & Hosted Zone</span>
    - <span onclick="document.getElementById('tls-ssl').scrollIntoView()" class="link">SSL Certificate</span>
- <span onclick="document.getElementById('cloudformation').scrollIntoView()" class="link">CloudFormation</span>
    - CloudFormation Prerequisites
- Anatomy of Template
    - TL;DR
    - Template
    - Parameters
    - S3 Buckets
    - Cloudfront Distribution
    - Route53 Recordset

# <span onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Angular on AWS</span>

<p align="center" class="article-header">
    <img src="/assets/svgs/icons/angular.svg" width="10%" height="auto">
</p>

In this article we explain how to get an [Angular](https://angular.io/) application for your personal website up and running on the [AWS](https://aws.amazon.com/) cloud. We cover setting up your environment and provisioning all the resources you will need to deploy and run the **Angular** app. In a future article, we will cover [continuous integration and deployment](), i.e. creating a development pipeline so that changes to your **Angular** app can be automatically built and deployed anytime you push to your version control. We will use the environment detailed in this article later as a base upon which to build the complexity of [CI/CD](https://en.wikipedia.org/wiki/CI/CD).

Everything that follows will assume the reader is familiar enough with **Angular** to build and run an app on their local computer. If you are new to **Angular**, check out our [archive](/blog/archive) for more articles aimed at a more novice audience. 

## <span id="cost-optimization" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Cost Optimization</span>

**AWS** is a diverse eco-systems of services and platforms. As such, there are many different approaches you could take to get an **Angular** app onto **AWS**. You could provision an [EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) instance and install a lightweight web server like [nginx](https://www.nginx.com/) or [apache](https://httpd.apache.org/) onto it. If portability and scability are important for you, you might opt to deploy an image of a web server into a managed container using a service like [AWS Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html). Or, if you're feeling adventurous, you might decide to go for broke and manage the cluster yourself with something like [AWS Elastic Kubernetes Service](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) or [OpenShift](https://docs.aws.amazon.com/ROSA/latest/userguide/what-is-rosa.html). These are all viable solutions; indeed, you will often encounter these architectures in production. However, the needs of a production system are quite different from the needs of a personal website.

The [Cumberland Cloud](https://cumberland-cloud.com)'s guiding principle in architecting a cloud environment is simple: **cost**. If a thing can be done cheaply without sacrificing quality, then we will always select the route with the least cost. The approaches detailed in the previous paragraph all suffer from one crucial defect: these methods quickly rack up charges. **EC2** and container orchestration clusters are always running and thus always incurring charges; if they are not managed properly, your bill can quickly get out of control.

We do not need the computing power of a full fledged web server (virtual or otherwise). All we need is to host some static files (i.e., the HTML, JS and CSS files that an **Angular** app transpiles down into when you `ng build`). [AWS Simple Storage Service (S3)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html) give us the ability to host a large quantity of static content for virtually free in a **S3 bucket**. We can then distribute the contents of the **S3 bucket** through a [global content distribution network](https://en.wikipedia.org/wiki/Content_delivery_network) **AWS** manages called [CloudFront](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-cloudfront-walkthrough.html).

The **Cumberland Cloud** website is written in **Angular** and this is the method we use to host the build files. We think the numbers speak for themselves. Last month, the entire bill for [https://cumberland-cloud.com](https://cumberland-cloud.com) was _$0.70_. By contrast, the lowest monthly charges you will find for an **EC2** are between _$18_ - _$30_, depending on the CPU and memory specifications.

With those figures in mind, further justification for pursuing this route should not need given. 

## <span id="setup-prerequisites" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Setup Prerequisites</span>

There are several things you will need to set up manually in your **AWS** account before we proceed. These items are covered briefly in the sections below, with links to the relevant documentation provided for further investigation.

### <span id="domain-hosted-zone" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Domain & Hosted Zone</span>

You will need to purchase a domain name and set up a hosted zone for that domain. [When you register a domain through AWS Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html), AWS will automatically provision a hosted zone for you. If you already own a domain through a different registrar, you will need to [setup the hosted zone yourself](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/MigratingDNS.html).

Once the hosted zone is provisioned and setup, note the physical ID for later,

<p align="center">
    <img src="/assets/imgs/articles/aws_hosted_zone_id.png" width="85%" height="auto">
</p>

### <span id="tls-ssl" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">TLS/SSL Certificate</span>

In order to setup a secure website through **HTTPS**, you will need a valid certificate from an authorized [Certificate Authority](https://en.wikipedia.org/wiki/Certificate_authority). Without a valid SSL certificate, visitors to your site will get a warning their connection is insecure and attackers may be trying to steal their information.

**AWS** issues its own certificates through the [AWS Cerfiticate Manager (ACM)](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html). The easiest way to setup **HTTPS** for your **S3-Cloudfront** distribution is to provision a certificate through the **ACM**. [Follow the instructions in the official documentation](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) to setup an SSL certificate.

If you registered `example.com` as your domain, then you will need to request a certificate for `*.example.com`. While not technically neccessary for the current scope, the wildcard will allow the certificate to valid any requests to subdomains within your domain, such as `api.example.com` or `app.example.com`. [In another article](), we show how to setup backend functionality for an **Angular** app via [AWS APIGateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html); if you use the wilcard, you will be able to use the same certificate as you follow .

Once the certificate is provisioned (this may take up to a day if your domain isn't registered through **Route53**), note the [AWS Resource Name (ARN)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) of the certificate,

<p align="center">
    <img src="/assets/imgs/articles/aws_certificate_arn.png" width="85%" height="auto">
</p>

## <span id="cloudformation" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">CloudFormation</span>

[CloudFormation]() is the **AWS** version of [Infrastructure-as-Code (IaC)](). *IaC* uses [declarative programming](https://en.wikipedia.org/wiki/Declarative_programming) to automate and version control the environment on which a given application runs. Using [YAML](https://yaml.org/) syntax, you create _templates_ of a cloud environment by declaring a collection of resources. Each resource has unique configuration properties that determine how the physical analogue of each block is mapped in the cloud, i.e. how much space a volume should allocate, how much memory an EC2 should provision, etc. The result is then uploaded to the **CloudFormation** API where cloud resources are created according to the parsed template. 

*IaC* templates can be committed to version control, just like regular code. This brings with it all the benefits application source code receives from using version control: an immutable history of changes, the ability to roll back to previously committed configurations, a web hook for continuous deployment and integration, and much more. Perhaps the greatest benefit of all, though, is reusability. Once an *IaC* has been created and debugged, it be can deployed into any account, at any time. 

The **Cumberland Cloud** curates a repository of **CloudFormation** templates (<sup><sub>[found on our Github](https://github.com/chinchalinchin/cf-deploy.git)</sup></sub>). Over the years, we have accumualted templates for virtually every imaginable use. Among the many templates we have maintain, one of the first ones we ever created was the **S3**-**Cloudfront** distribution template.

### <span id="cloudformation-prerequisites" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">CloudFormation Prerequisites</span>

Before following along with this section, make sure you [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [configure it with your account credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).


## <span id="anatomy-template" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Anatomy of a Template</span>

TODO

### <span id="tldr" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">TL;DR</span>

```bash
git clone https://github.com/chinchalinchin/cumbercloud-web
cd cumbercloud-web
./scripts/provision-stack
```

### <span id="template" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Template</span>

```yaml
AWSTemplateFormatVersion: '2010-09-09'

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
        LogFilePrefix: 'log/'
      WebsiteConfiguration:
        IndexDocument: 'index.html'

  WebsiteBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref WebsiteBucket
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: 'Allow'
            Action: 
              - "s3:GetObject"
            Principal:
              CanonicalUser: !GetAtt WebsiteOriginAccessIdentity.S3CanonicalUserId
            Resource: !Sub '${WebsiteBucket.Arn}/*'

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
              !Join ['', ['origin-access-identity/cloudfront/', !Ref WebsiteOriginAccessIdentity ]]
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
        DefaultRootObject: 'index.html'
        IPV6Enabled: true
        Logging:
          Bucket: !GetAtt WebsiteBucketLogs.DomainName
          IncludeCookies: false
          Prefix: 'log/'

  WebsiteOriginAccessIdentity:
    Type: AWS::CloudFront::CloudFrontOriginAccessIdentity
    Properties:
      CloudFrontOriginAccessIdentityConfig:
        Comment: !Sub 'CloudFront Origin Access Identity for ${applicationName}.${domainName}'

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

### <span id="parameters" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Parameters</span>

1. **applicationName** :

2. **certiicateArn** :

3. **hostedZoneId**:

4. **domainName**: 

### S3 Buckets

TODO

### <span id="cloudfront-distribution" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Cloudfront Distribution</span>

TODO

### <span id="route53-recordset" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Route53 Recordset</span>

TODO

## <span id="prerendering-problem" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">The Problem With Prerendering</span>

If you are building the **Angular** app with `ng build`, at this point, you have a fully functional website. You can stop reading, upload the contents of the _dist_ folder to your **S3** bucket and call it a day. However, you may have a project on your hands that requires prerendering.

One of the major drawbacks of a [Single Page Application (SPA)]() is it renders client-side, meaning the application doesn't fully construct the [Document Object Model (DOM)]() (i.e. the HTML document structure) until the files have been delivered over the internet to the user's computer; Javascripts that run locally on the user's browser construct the majority of the webpage. This presents a problem to web crawlers, like [Googlebot](), that rely on the **DOM** and static content to index websites. While web crawlers have made strides in recent years with rendering javascript, **SPA**s are still effectively invisible to most search engines, if additional steps are not taken.

This is where the concept of _prerendering_ comes into play. [Angular Universal]() is a library that renders **Angular** applications server side before they are distributed over the internet. (For more information on implementing **Angular Universal** and _prerendering_ in your app, see [the tutorial found here]()) By \*_prerendering_, the webpages are fully formed before the user ever requests to see them. This allows web crawlers and search engines to find your site.

However, in typical fashion, this presents another problem. Luckily, there is a nice, neat, out-of-the-box solution for this particular problem.

When an **Angular** application is prerendered, it will generate an _index.html_ for each route, as opposed to a normal **Angular** build that compiles a singe _index.html_ and bootstraps the entire application from that entrypoint. In order to accomodate this difference, the **CloudFront** distribution will need to be setup to append `index.html` to the end of all routes, so that will be serve the correct index on each path. If unchanged, the default configuration will serve the root _index.html_ and then pass the routing to the **Angular** app, instead of loading that route's _index_ and bootstrapping from there. This would effectively make the _prerendering_ process moot, since the static html generated by the prerender would not be served by the **Cloudfront** distribution.


### <span id="cloudfront-edge" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">CloudFront Edge Functions</span>

To solve this problem, we will use **Cloudfront** [edge functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html). **Cloudfront edge functions** are middleware that execute on **AWS* before an incoming requests is received or after an outgoing response is processed. 

You will need to set up **CloudFront** edge functions to append *index.html* to the [end of each route that is missing an index.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html). 


### <span id="function-handler" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Function Handler</span>

```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (uri.endsWith('path')) {
        request.uri += '/index.html';
    }
    else if (uri.endsWith('path/')) {
        request.uri += 'index.html';
    }
    return request;
}
```

## Other Articles In Series

- [Angular Prerendering]()
- [Angular Search Engine Optimization]()
- [Angular Continuous Integration and Deployment]()

