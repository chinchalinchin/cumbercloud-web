<span class="inline-aside">This article is part of the **Cumberland Cloud**'s [Building a Web Application with Angular]() series.</span>

# <span onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Angular on AWS</span>

<p align="center" class="article-header">
    <img src="/assets/svgs/icons/angular.svg" width="10%" height="auto">
</p>

## Introduction

In this article we explain how to get an [Angular](https://angular.io/) application for your personal website up and running on the [AWS](https://aws.amazon.com/) cloud. We cover setting up your environment and provisioning all the resources you will need to deploy and run the **Angular** app. In a subsequent article in [this series](), we will cover [continuous integration and deployment](), i.e. creating a development pipeline so that changes to your **Angular** app can be automatically built and deployed anytime you push to your [version control](https://en.wikipedia.org/wiki/Version_control). We will use the environment detailed in this article as a foundation upon which to build the complexity of [CI/CD](https://en.wikipedia.org/wiki/CI/CD).

Everything that follows assumes the reader is familiar enough with **Angular** to build and run an app on their local computer. If you are new to **Angular**, check out our [archive](/blog/archive) for previous articles in this series for more information on getting started.

## <span id="cost-optimization" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Cost Optimization</span>

<div class="img-container">
  <div>
    <p>
      <b>AWS</b> is a diverse eco-systems of unrelated services and platforms. As such, there are many different approaches you can take to get an <b>Angular</b> app onto <b>AWS</b>; each method has its advantages and disadvantages, and depending on your situation, you may have reason to choose one over the other. You could provision an <a id="ec2-link" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html" target="_blank">Elastic Cloud Compute (EC2) instance</a> and install a lightweight web server like <a id="nginx-link" href="https://www.nginx.com" target="_blank">nginx</a> or <a id="apache-link" href="https://httpd.apache.org" target="_blank">apache</a> onto it. If portability and scability are important for you, you might opt to deploy an image of a web server into a managed container using a service like <a id="ecs-link" href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html" target="_blank">AWS Elastic Container Service (ECS)</a>. Or, if you're feeling adventurous, you might decide to go for broke and manage the cluster yourself with something like <a id="eks-link" href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html" target="_blank">AWS Elastic Kubernetes Service (EKS)</a> or <a id="openshift-link" href="https://docs.aws.amazon.com/ROSA/latest/userguide/what-is-rosa.html" target="_blank">RedHat OpenShift on AWS (ROSA)</a>. These are all viable solutions; indeed, you will often encounter these architectures in production. However, the needs of a production system are quite different from the needs of a personal website.
    </p>
    <p>
      The <a id="cumbercloud-link-1" href="https://cumberland-cloud.com" target="_blank">Cumberland Cloud</a>'s guiding principle in architecting a cloud environment is simple: <i>cost above all else</i>. If a thing can be done cheaply without sacrificing quality, then we will always select the route with the least cost. The approaches detailed in the previous paragraph all suffer from one crucial defect: these methods quickly rack up charges. <b>EC2</b> and container orchestration clusters are always running and thus always incurring charges; if they are not managed properly, your bill can quickly get out of control.
    </p>
  </div>
  <figure style="min-width: 25%; max-width: 35%; margin-top: auto; margin-bottom: auto;">
    <a
      id="cloud-design-link"
      href="/assets/imgs/articles/cloud_design.png"
      target="_blank"
    >
      <img 
        id="cloud-design-img"
        alt="AWS is a diverse eco-sytem."
        class="article-img mat-elevation-z1"
        src="/assets/imgs/articles/cloud_design.png" 
        width="100%"
      >
    </a>
    <figcaption class="text-center inline-aside">AWS has <b>hundreds</b> of services</figcaption>
  <figure>
</div>

We do not need the computing power of a full fledged web server (<span class="inline-aside">virtual or otherwise</span>). All we need is to host some static files, i.e., the _HTML_, _JS_ and _CSS_ files that an **Angular** app <a id="transpiler-link" href="https://en.wikipedia.org/wiki/Source-to-source_compiler" target="_blank">transpiles</a> down into when you `ng build`. [AWS Simple Storage Service (S3)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html) give us the ability to host a large quantity of static content for virtually free in a **S3 bucket**. We can then distribute the contents of the **S3 bucket** through a [global content distribution network](https://en.wikipedia.org/wiki/Content_delivery_network) **AWS** manages called [CloudFront](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-cloudfront-walkthrough.html).

<div class="img-container">
  <figure style="min-width: 35%; max-width:50%; margin-top: auto; margin-bottom: auto;">
    <a
      id="cloudfront-cdn-link"
      href="/assets/imgs/articles/cloudfront_cdn.png" 
      target="_blank"
    >
      <img 
        id="cloudfront-cdn-img"
        class="article-img"
        alt="AWS CloudFront cache diagram" 
        src="/assets/imgs/articles/cloudfront_cdn.png" 
        width="100%" 
      />
    </a>
    <figcaption class="text-center inline-aside">
      The Global <b>AWS CloudFront</b> Network
    </figcaption>
  </figure>
  <div style="margin-left: 2.5%;">
    <p>
      While you can host a static website from <b>S3</b> without <b>CloudFront</b>, the benefits with <b>CloudFront</b> are enormous; <b>CloudFront</b> will determine the geographical location of traffic entering your site, based on the incoming IP and other metadata associated with the request, and route it to the cache in its network physically closest to the user (<span class="inline-aside">the so-called edge location</span>). Not only does this improve latency, but it also prevents overtaxing your <b>S3</b> access limits and thus incurring access charges (<span class="inline-aside">very hard to do with <b>AWS</b>'s generous <b>S3</b> pricing tiers, but it is possible</span>), since a subsequent request to the same resource will defer to the <b>CloudFront</b> cache. <b>AWS</b> is a global cloud provider, so they maintain data centers on every continent (<span class="inline-aside"> except Antartica, of course</span>). Using <b>CloudFront</b> lets you leverage a network <b>AWS</b> has dumped millions of dollars into developing and maintaining over the years, for less than a dollar a month.
    </p>
    <p>
      The <b>Cumberland Cloud</b> website is written in <b>Angular</b> and this is the method we use to host our build files. We think the numbers speak for themselves. Last month, the entire bill for <a id="cumbercloud-link-2" href="https://cumberland-cloud.com" target="_blank">https://cumberland-cloud.com</a> was <i>$0.70</i>. By contrast, the lowest monthly charges you will find for an <b>EC2</b> are between <i>$18</i> - <i>$30</i>, depending on the CPU and memory specifications. You would be lucky to find a <a id="cms-link" href="https://en.wikipedia.org/wiki/Content_management_system" target="_blank">Content Management System (CMS)</a>, like <b>Wix</b> or <b>Wordpress</b>, with monthly hosting rates as low as that.
    </p>
  </div>
</div>

With those figures in mind, the justification for pursuing this route should be self-evident. In the sections that follow, we show how to setup a **S3**-**CloudFront** distribution you can use to host an **Angular** single page application for dirt-cheap.

## <span id="setup-prerequisites" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Setup Prerequisites</span>

There are several things you will need to set up manually in your **AWS** account before we proceed. These items are covered briefly in the sections below, with links provided to the relevant documentation for further investigation.

### <span id="domain-hosted-zone" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Domain & Hosted Zone</span>

You will need to purchase a domain name and set up a hosted zone for that domain. [When you register a domain through AWS Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html), AWS will automatically provision a hosted zone for you. However, if you already own a domain through a different registrar, you will need to [setup the hosted zone yourself](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/MigratingDNS.html) and point your DNS servers to **AWS**.

Once the hosted zone is provisioned and setup, note the physical ID for later. This can be found in the **Route53** web console,

<p align="center">
  <a 
    id="hosted-zone-link"
    href="/assets/imgs/articles/aws_hosted_zone_id.png"
    target="_blank"
  >
    <img 
      id="hosted-zone-img"
      src="/assets/imgs/articles/aws_hosted_zone_id.png" 
      alt="Where to find the Hosted Zone ID in the console"
      class="article-img" 
      width="85%" 
      height="auto"
    />
  </a>
</p>

### <span id="tls-ssl" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">TLS/SSL Certificate</span>

In order to setup a secure website through **HTTPS**, you will need a valid certificate from an authorized [Certificate Authority](https://en.wikipedia.org/wiki/Certificate_authority). Without a valid SSL certificate, visitors to your site will get a warning their connection is insecure and attackers may be trying to steal their information.

**AWS** issues its own certificates through the [AWS Cerfiticate Manager (ACM)](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html). The easiest way to setup **HTTPS** for your **S3-Cloudfront** distribution is to provision a certificate through the **ACM**. [Follow the instructions in the official documentation](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) to setup an SSL certificate.

If you registered `example.com` as your domain, then you will need to request a certificate for `*.example.com`. While not technically neccessary for the current scope, the [wildcard](https://en.wikipedia.org/wiki/Wildcard_character) will allow the certificate to valid any requests to subdomains within your domain, such as `api.example.com` or `app.example.com`. [In another article](), we show how to setup backend functionality for an **Angular** app via [AWS APIGateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) and [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html); if you use the wilcard, you will be able to use the same certificate as you follow along with all of our guides and tutorials.

Once the certificate is provisioned (<span class="inline-aside">this may take up to a day if your domain isn't registered through **Route53**</span>), note the [AWS Resource Name (ARN)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) of the certificate in the **ACM** web console,

<p align="center">
  <a 
    id="certificate-link"
    href="/assets/imgs/articles/aws_certificate_arn.png"
    target="_blank"
  >
    <img 
      id="certificate-img"
      alt="Where to find the SSL Certificate ARN in the web console"
      src="/assets/imgs/articles/aws_certificate_arn.png" 
      width="85%" 
      height="auto" 
      class="article-img"
    >
  </a>
</p>

## <span id="cloudformation" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">CloudFormation</span>

After the domain and certificate have been provisioned in your **AWS** account, the hard part is over; the rest of the process can be automated. We provide a **CloudFormation** template below for provisioning the rest of the stack. Using either through the [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html), [AWS API](https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/Welcome.html) or the [AWS Console](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-console.html), you can upload this template to the cloud and **CloudFormation** will automatically create everything you need for an **S3**-**CloudFront** distribution.

[CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) is the **AWS** version of [Infrastructure-as-Code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code). _IaC_ uses [declarative programming](https://en.wikipedia.org/wiki/Declarative_programming) to automate and version control a cloud environment. Using [YAML](https://yaml.org/) syntax (<span class="inline-aside">sometimes the _A_ is dropped to abbreviate the abbreviation to _YML_</span>), you create _templates_ of a cloud environment by declaring a collection of resources, also known as a _stack_ of resources.

---

**NOTE**: _YAML_, like _GNU_ and _PHP_, is one of the famous [recursive acronyms](https://en.wikipedia.org/wiki/Recursive_acronym) in computer science; it stands for _YAML Ain't Markup Language_.

---

Each resource is specified in a _block_ of code and has unique configuration properties that determine how the physical analogue of each block is mapped in the cloud, i.e. how much space a volume should allocate, how much memory an **EC2** should provision, what algorithm should be used to encrypt a bucket, etc. The result is then uploaded to the **CloudFormation** API (<span class="inline-aside">ultimately, the console and the CLI are just [wrappers](https://en.wikipedia.org/wiki/Wrapper_function) around the API</span>). **CloudFormation** parses the template, applies any intrinsic functions (<span class="inline-aside">covered in the <span onclick="document.getElementById('parameters').scrollIntoView()" class="link">Parameters</span> section</span>) and then deploys the stack into your account.

Since _YML_ is just code, _IaC_ templates can be committed to version control, just like regular code. This brings with it all the benefits application source code receives from version control: an immutable history of changes, the ability to roll back to previously committed configurations, a web hook for continuous deployment and integration, and much more. Perhaps the greatest benefit of all, though, is reusability. Once an _IaC_ has been created and debugged, it be can deployed into any account, at any time.

The **Cumberland Cloud** curates a repository of **CloudFormation** templates (<span class="inline-aside">[found on our Github](https://github.com/chinchalinchin/cf-deploy.git)</span>). Over the years, we have accumulated templates for virtually every use case imaginable. Among the many templates we maintain, one of the first ones we ever created was the **S3**-**Cloudfront** distribution template.

### <span id="cloudformation-prerequisites" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">CloudFormation Prerequisites</span>

Before proceeding, make sure you [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [configure it with your account credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## <span id="anatomy-template" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Anatomy of a Template</span>

In this section, we describe in detail the anatomy of the **S3**-**Cloudfront** distribution **CloudFormation** template. If you're only interested in getting the stack deployed, you can clone our sample repository on [Github](https://github.com/chinchalinchin/cumbercloud-cloudformation) and use a script contained within to stand up the stack without hassle.

### <span id="tldr" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">TL;DR</span>

```bash
git clone https://github.com/chinchalinchin/cumbercloud-cloudformation
cd cumbercloud-cloudformation
./scripts/provision-stack
```

The script will prompt you to enter your domain name (without the _https://_ or _www._), the hosted zone ID, the SSL certificate ARN and a tag for the application namespace. The last argument is purely cosmetic and organizational; it will be appended to resources that are provisioned so they can be logically grouped together.

### <span id="template" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Template</span>

The raw **CloudFormation** template is given below. It can also be found on the [Cumberland Cloud Github page](https://github.com/chinchalinchin/cumbercloud-cloudformation/blob/master/templates/web.yml).

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
    NoEcho: true
  hostedZoneId:
    Type: AWS::Route53::HostedZone::Id
    Description: Physical ID of the hosted zone where the domain is being served.
    NoEcho: true
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
      PublicAccessBlockConfiguration:
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
        BlockPublicPolicy: true
        BlockPublicAcls: true

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
      PublicAccessBlockConfiguration:
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
        BlockPublicPolicy: true
        BlockPublicAcls: true

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
      Tags:
        - Key: "Application"
          Value: !Ref applicationName

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

The template is organized into four main blocks: `Description`, `Parameters`, `Resources` and `Outputs`. The `Description` block is a string of metadata that is appended to the stack; it serves no function other than describing to a human the purpose of the stack. Nothing in the `Description` block affects how or what gets provisioned. The other blocks, where the meat of the template is, are described below in more detail.

### <span id="parameters" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Parameters</span>

The `Parameters` block defines the input for a **CloudFormation** template. These values must be provided to the template anytime it is posted to **AWS**. If you use the **AWS** CLI, the `aws cloudformation create-stack` API command ingests the parameters directly from the command line. The following command will provision the **S3**-**Cloudfront** template, assuming the template is saved in a file named _cloudformation.yml_,

```bash
aws cloudformation create-stack \
          --stack-name "Angular-WebStack" \
          --template-body file://cloudformation.yml \
          --parameters ParameterKey=applicationName,ParameterValue=<application-name> \
                        ParameterKey=domainName,ParameterValue=<domain-name>\
                        ParameterKey=certificateArn,ParameterValue=<certificate-arn> \
                        ParameterKey=hostedZoneId,ParameterValue=<hosted-zone-id>
```

---

**NOTE**: The template, _cloudformation.yml_, must be saved in the directory _where this command is executed_. If you try to point this command to a location outside the current working directory, it will cause endless headaches as you struggle to figure out why the **AWS** CLI cannot find your template.

---

Replace `<application-name>`, `<domain-name>`, `<certificate-arn>` and `<hosted-zone-id>` with the corresponding values for your environment. The purpose and function of each variable is described several paragraphs below. 

The `aws cloudformation create-stack` command has several arguments. `--stack-name` is the identifier given to the stack. `--template-body` points the command to the location of the _YML_ template (<span class="inline-aside">you can also remove the _file://_ prefix and specify the template as an inline string</span>). `--parameters` is the aforementioned list of key-value pairs that are passed into the `Parameters` block of the template. Notice how the `ParameterKey` maps to the `Parameter` names defined in the template. `ParameterValue` maps to the value assigned to that particular parameter.

Parameters allow you to generalize your template. You can parameterize any hardcoded values specific to your environment so your template can be reused in different accounts, or even different environments in the same account.

In order to utilize parameters in a template, you must use one of **CloudFormation**'s [intrinsic functions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html). Typically, you will only need `Fn::Sub` (<span class="inline-aside">substitute function</span>) or `Fn::Ref` (<span class="inline-aside">reference function</span>), although there are many other functions with which you should familiarize yourself, such as `Fn::GetAtt` and `Fn::ImportValue` . Intrinsic functions are macros executed by **CloudFormation** before the template is processed. For example, the `Fn::Sub` intrinsic function substitutes the value of a parameter into a string expression, whereas the `Fn::Ref` references the value of a parameter.

---

**NOTE**: The syntax for intrinsic functions can be frustrating the first time you encounter it, especially if you are unfamiliar with _YML_. If you are having trouble understanding what exactly an intrinsic function is doing, it is most likely due to the pecularities of _YML_ data structures; it is helpful to read the first few chapters of the [official YML specification](https://yaml.org/spec/1.2.2), where the syntax is precisely defined.

---

**NOTE**: Another thing to keep in mind is the syntactical variation of intrinsic functions. For instance, the substitute function can be used in a `!Sub` form or the `Fn::Sub` form. Each form has slightly different syntax. In general, all intrinsic functions have this multiplicity of forms.

---

The **S3**-**CloudFromation** template requires the following parameters,

1. **applicationName** : This is a tag used to enforce naming conventions. Note how the bucket resources substitute the value of **applicationName** in for their bucket names using the `Fn::Sub` [instrinsic function](). It is a good practice to enforce naming and tagging conventions early on, before your accumulate too many resources in your account without any organization.

2. **certiicateArn** : This is the **ARN** of the SSL certificate you provisioned in a previous section. This is ingested by the `AWS::CloudFront::Distribution` resource through the `DistributionConfig.ViewerCertificate.AcmCertificateArn` property, using the `Fn::Ref` [instrinic function](). Note the difference in syntax between `Fn::Sub` and `Fn::Ref`. `Fn::Sub` injects the value of the parameter into a string, whereas `Fn::Ref` refers to a single, primitive value.

3. **hostedZoneId**: This is the phyiscal ID (not the **ARN**!) of the Hosted Zone for your domain. It is ingested through the `HostedZoneId` property of the `AWS::Route53::RecordSetGroup` using the `Fn::Ref` intrinsic function.

4. **domainName**: This is the domain name you registered in or transferred to **Route53**. Do not include the _https://_ or _www._ in the value. It is ingested in two spots in the template: in the `RecordSets` property of `WebsiteRoute53RecordSetGroup` resource and through the `DistributionConfig.Aliases` property of the `WebsiteDistribution` resource.

Each parameter is defined through the nested properties underneath the parameter name. `Description` is a human readable explanation of the purpose of the parameter, but has no other effect on the template.

`Type` defines the data type of the parameter. **AWS** supports basic primitive types, like `String`, `Number` and `List`, but they also support [AWS specific parameter types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#aws-specific-parameter-types). In particular, the `hostedZoneId` parameter in our template is a native AWS `Type`, namely `AWS::Route53::HostedZone:Id` ; **CloudFormation** will validate the inputted value for `hostedZoneId` against what it expects a `HostedZone::Id` to look like and reject the input if it is not syntactically valid.

Unfortunately, **AWS** does not support a `Type` specifically for certificate **ARN**s (<span class="inline-aside">yet; you can open an issue on the [CloudFormation Github Roadmap](https://github.com/aws-cloudformation/cloudformation-coverage-roadmap) and perhaps the folks at AWS will include it in a future release</span>), so we pass in that value as a `String`.

Both the `hostedZoneId` and the `certificateArn` parameter have an additional property, `NoEcho` . This property prevents the value of these parameters from being printed in the **AWS** web console; parameters with this property will be censored and replaced with a string of "\*\*\*"'s when they are displayed. You should add this property to any parameter that contains sensitive, account-specific information, such as passwords, physical IDs and ARNs.

You can read more about `Parameter` properties, types and syntax in the [Parameters section](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html) of the [CloudFormation documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html).

### <span id="s3-buckets" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">S3 Buckets</span>

After the `Parameters` block, we move onto the `Resources` block. The first two resources we configure are both instances of [AWS::S3::Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html).

The first bucket, `WebsiteBucketLogs`, is an archive for access log files. Any time users enter your website, logs will be generated and stored in this bucket as raw text files. While not as featured or useful as a full-fledged log service like [Datadog](https://www.datadoghq.com/) or [Splunk](https://www.splunk.com/), it is better than nothing and **AWS** does have tools, such as [Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html), for querying directly against **S3** bucket objects should you find yourself in situation where you need to search through thousands of logs for a specific date, time or IP.

The second bucket, `WebsiteBucket`, is where the actual website files will be hosted. This is where you will upload the artifacts of `ng build`.

Both of the buckets have a `DeletionPolicy` attached to them. Notice how the `DeletionPolicy` is _not_ nested under the `Properties` attribute. This is because a `DeletionPolicy` is a property of all resources, not just **S3** buckets. The [DeletionPolicy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html) configures how the resource is treated when its containing stack is deleted. If `DeletionPolicy` is set to `Retain`, the resource itself will be kept, but it will be disassociated from the stack that is being deleted. Some services, like the [Elastic Block Store (EBS)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html) and the [Relational Database Service (RDS)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html), offer an option of `Snapshot`, where the state of the service is snapshotted at a particular moment in time and saved to a backup store, while the actual resource is deleted.

We have set the `DeletionPolicy` on each bucket to `Delete`, meaning when the stack is deleted, nothing is retained; everything associated with the resource will be deleted. You may want to modify this to `Retain`, depending on your circumstances.

Both buckets also [block all public access](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html) through the `PublicAccessBlockConfiguration` property. This ensures anyone with a direct link to the contents of `WebsiteBucket` will be denied access by default. In other words, users cannot access the contents of the website directly; they must enter the website through the **CloudFront** distribution.

The astute reader may wonder how the **CloudFront** distribution is able to access the **S3** bucket if all access is explicitly denied; after all, the distribution needs to _distribute_ the contents of the bucket, and to do that it will need access. So how does the distribution gain access to the bucket? This is where the [AWS::S3::BucketPolicy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-policy.html) and [AWS::CloudFront::CloudFrontOriginAccessIdentity](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-cloudfrontoriginaccessidentity.html) come into play.

Think of an [origin access identity](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) as a disguise the **CloudFront** distribution wears. From **S3**'s perspective, the holder of an **origin access identity (OIA)** is no different from a regular [IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html); **CloudFront** essentially impersonates a user, and then using a [bucket policy](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-iam-policies.html), we explicitly give _only_ that user permission to access the **S3** bucket and nothing else. 

The `WebsiteBucketPolicy` gives the canonical user, represented by the `S3CanonicalUserId` attribute of the `WebsiteOriginAccessIdentity`(<span class="inline-aside">note the usage of the [Fn::GetAtt]() intrinsic function to point to the attribute of a resource</span>), the `s3:GetObject` permission. The canonical id is attached to the `AWS::CloudFront::Distribution` through its `DistributionConfig.Origins` property. In other words, the `WebsiteBucketPolicy` gives explicit permission to the distribution to retrieve objects from the resource bucket through its attached **OIA**.

When you are architecting a cloud environment, or an application in general, you should always follow the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege). This is a generally accepted best practice for securing an environment. Access management systems should start on a foundation of denying users access to everything and then only allowing the actions that are absolutely neccessary.

In the current setup, this translates into making sure nothing can access our `Resource`, i.e. the **S3** bucket, and then explicitly granting _only_ the **CloudFront** distribution, the `Principal`, permission to acccess its contents, and even then ensuring the distribution has _only_ the `Actions`, i.e. the permissions, it absolutely requires, in this case, `s3:GetObject`.

Take note of the usage of a wildcard in the `Resource` of the `WebsiteBucketPolicy`, i.e. `${WebsiteBucket.Arn}/*`. The wildcard will match any object in the bucket, but there is a subtlety lurking. The policy does not apply to the _bucket_, but to _objects_ in the bucket. We could append subdirectories in the `Resource` path to further scope the permissions, as we might need to do if we were hosting multiple websites from the same bucket.

At this point, we have two buckets, but they have not been configured to serve a website. Underneath `WebsiteBucket`, we add a `WebsiteConfiguration` property that specifies `IndexDocument`. This is the root _index.html_ of the webpage, the file that is served when a user enters your domain.

We also attach the `WebsiteBucketLogs` to the logstream generated by web traffic, through the `LoggingConfiguration` property of `WebsiteBucket`. The `DestinationBucketName` uses the `Fn::Ref` intrinsic function to link the log bucket to the web bucket, and then `LogFilePrefix` informs the `WebsiteBucketLogs` in which subdirectory it should store log files.

### <span id="cloudfront-distribution" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">CloudFront Distribution</span>

Which brings us to the biggest chunk of the template, the [AWS::CloudFront::Distribution](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html). There is a lot of configuration underneath this resource, although only some of it is _absolutely_ necessary; much of it is only specified to optimize the distribution, or to show how it would be optimized.

First of all, we should notice the `AWS::CloudFront::Distribution` only has two properties, `DistributionConfig` and `Tags`. `Tags` is simply a list of key-value pairs appended to the resource as metadata; it has no material effect on how the distribution functions. All the functionality and configuration comes from the single `DistributionConfig` property . However, this property contains many nested properties and can take a little while to fully unpack. Let's go through each subproperty in turn.

1. **Aliases**: This is a list (<span class="inline-aside"><span class="inlink-aside">or <a id="yaml-sequence-link" href="https://yaml.org/spec/1.2.2/#22-structures" target="_blank">sequence</a></span>, in the terminology of the _YML_ spec</span>) of domains the distribution serves. In our case, we have a single domain, so we use the `Fn::Ref` intrinsic function to pull the value from the parameters.

2. **Origins**: This is a list of content sources for the distribution. **CloudFront** will crawl the publicly accessible content from these sources and store it in its global **CDN** cache. In our template, we attached a single `AWS::CloudFront::CloudFrontOriginAccessIdentity` to the distribution through the `S3OriginConfig`, but the syntax allows for multiple origins to be specified. In this way, you can collate multiple sources into a single distribution.

3. **DefaultCacheBehavior**: As mentioned in the <span onclick="document.getElementById('cost-optimization').scrollIntoView()" class="link">Cost Optimization section</span>, **CloudFront** is essentially a global cache. Depending on the location of the user entering your site, it will route them to the cache physically closest to them. This property determines how the cache behaves. There are three options within this block that are important for configuring your distribution. All of the other options underneath the `DefaultCacheBehavior` property can be tweaked to suit your circumstances:
  - In the `AllowedMethods` property, we only set `HEAD`, `GET` and `OPTIONS`; all other HTTP methods which attempt to pass through the distribution are rejected. This is important so that `POST`s and `PUT`s will not be able to upload malicious content to your bucket. 
  - In the `TargetOriginId`, we point traffic to our `WebsiteBucket`. This defines which origin from the `Origins` property acts as the primary cache.
  - In the `ViewerProtocolPolicy`, we force all trafic onto a secure connection with the `redirect-to-https` option. This attribute is important for security, but in general, it should not need changed.

4. **PriceClass**: This property is important if you are trying to cut your costs. It controls on which nodes of the **CloudFront CDN** your content is available. If you want your website cached at every data center in the **AWS** network, you will set this property to `PriceClass_all`, as we have done. There are also `PriceClass_100` and `PriceClass_200` settings that offer reduced rates for less cache availability. You can read more about the rates for each price class and how they affect which network nodes your content will be cached on [over at the official CloudFront documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html) and on the [CloudFront pricing page](https://aws.amazon.com/cloudfront/pricing/).

5. **Enabled**: This property is primarily useful when you are _updating_ a stack, rather than _creating_ a stack. With this property, you can disable a **CloudFront** distribution without deleting it. A disabled distribution is unavailable over the internet. **NOTE**: Your **S3** bucket will still serve content, even if the distribution is disabled; the content just won't be cached in the **CDN**. If you configure your bucket to only allow access to the **OAI**, as we have done, then disabling a distribution is effectively the same as removing the website configuration from the bucket as well.

6. **ViewerCertificate**: Here is where we attach the SSL certificate the distribution uses to sign requests. The `AcmCertificateArn` pulls the value directly from the parameters. The `MinimumProtocolVersion` determines which encryption algorithms **CloudFront** has available to it; for a matrix of protocols versus supported encryption methods, [refer to the official documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/secure-connections-supported-viewer-protocols-ciphers.html).

7. **HttpVersion**: You can specify the *HTTP* protocol version to use here. In almost all cases, you should leave this as `http2`. For the curious, [DigitalOcean has an excellent article on the differences between HTTP1 vs. HTTP2](https://www.digitalocean.com/community/tutorials/http-1-1-vs-http-2-what-s-the-difference).

8. **DefaultRootObject**: The `DefaultRootObject` is one of the more important options for an **Angular** application. This is the file **CloudFront** serves when a user enters the domain. This makes sense if you think of a domain as a folder on computer. For example, when you visit a domain, such as [https://cumberland-cloud.com/](https://cumberland-cloud.com), you are actually requesting the file at the root of the _cumberland-cloud.com_ directory (<span class="inline-aside">in fact, most URLs are just file paths on remote servers)</span>. This configuration options maps a file name to this request. In fact, if **CloudFront** can not find an object to map a request to, say [https://cumberland-cloud.com/path/that/doesnt/exist.jpg](http://cumberland-cloud.com/path/that/doesnt/exist.jpg), it will default to the object specified in this property. This is especially important with **Angular**, as the application bootstraps from scripts loaded in the *index.html*, before taking the path and passing it off the to in-app [routing](https://angular.io/guide/routing-overview); if the *index.html* is not served on these paths, the **Angular** application will fail to load.

9. **IPV6Enabled**: In general, you should leave this option set to `true`. If set to `false`, the distribution will deny access to any user attempting to access the domain from an [IPV6](https://en.wikipedia.org/wiki/IPv6_address) address, as opposed to an [IPV4](https://en.wikipedia.org/wiki/IPv4) address.

10. **Logging**: Finally, we configure the website logging by pointing the logstream to the `WebsiteBucketLogs` resource and telling it in which bucket subdirectory to store the logs.

This is all the configuration required for a fully functional, secure **CloudFront** distribution. However, there are plenty more options we haven't covered. You can refer to the **CloudFormation** [resource reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) for the full [DistributionConfig](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-distributionconfig.html) specification to get a complete overview of all the configuration options available to you.

### <span id="route53-recordset" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Route53 Recordset</span>

TODO

### <span id="outputs" onclick="document.getElementById('toc').scrollIntoView()" class="pointer">Outputs</span>

TODO

Here we meet another intrinsic function, `Fn::GetAtt` or `!GetAtt`. Every resource has a set of return values it exposes once it is provisioned. For example, almost every resource will return the **ARN** as an attribute of the resource. You can hook into this value and output it via the `Outputs` block, or use it in the creation of another resource. In this way, you can chain together resources in a template, using the outputs of one resource as in the inputs into another.

You may, at this point, wonder about resource dependency. For instance, the `WebsiteDistribution` in the **S3**-**Cloudfront** template requires `WebsiteBucket` to exist before it can "distribute" it contents. How do we inform **CloudFormation** about this dependency? The answer in most cases is **CloudFormation** can figure it out by itself. This is because the intrinsic functions create a natural hierarchy in the template. The `Origins` property of the `WebsiteDistribution` references the `WebsiteBucket` directly, with the `!Ref` intrinsic function; this creates a link between the two resources. In other words, intrinsic functions are how **CloudFormation** is able to construct a resource tree and shake out the dependencies between them.

There are cases where you may have two resource blocks without any explicit mapping via intrinsic functions. In cases like these, you will need to use the [DependsOn attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html), you explicitly declare to **CloudFormation** there is a dependency between two resources. We will encounter this problem in the subsequent article in this series, when we attempt to [implement backend functionality for our website via API Gateway and AWS Lambda]().

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
