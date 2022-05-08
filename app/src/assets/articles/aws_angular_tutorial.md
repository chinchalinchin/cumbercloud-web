# Angular on AWS, Part 1: Getting Started

This is the first article in a series that covers how to get an [Angular]() application up and running on an [AWS Cloud Environment](). In this article, we will cover setting up your cloud environment so that an **Angular** app can be easily deployed into it. In future entries to the series, we will cover [continuous integration and deployment](), i.e. creating a development pipeline so that changes to your **Angular** app can be automatically built and deployed anytime you push to your version control.

What follows assumes the reader is familiar with **Angular**. If you are new to **Angular**, check out our [Angular Tutorial series]() before proceeding. After you finish, come back here to get your application into production.

## Cost Optimization

**AWS** is a diverse eco-systems of services and platforms. As such, there are many different approaches you could take to get an **Angular** app onto **AWS**. You could provision an [EC2]() instance and install a lightweight web server like [nginx](https://www.nginx.com/) or [apache](https://httpd.apache.org/) onto it. If portability and scability are important for you, you might opt to deploy a container of a web server onto a managed service like [AWS Elastic Container Service](). Or, if you're feeling adventurous, you might decide to go for broke and manage the cluster yourself with something like [AWS Elastic Kubernetes Service]() or [OpenShift](). These are all viable solutions; indeed, you will encounter these architectures in production quite often. However, the needs of a production system are quite different from the needs of a personal website.

The [Cumberland Cloud](https://cumberland-cloud.com)'s guiding principle in architecting a cloud environment is simple: **cost**. If a thing can be done cheaply without sacrificing quality, then we will always select the route with the least cost. The approaches detailed in the previous paragraph all suffer from one crucial defect: these methods quickly rack up charges. **EC2** and container orchestration clusters are always running; if they are not managed properly, your bill can quickly get out of control.

We do not need the computing power of a full fledged web server (virtual or otherwise). All we need is to host some static files (i.e., the HTML, JS and CSS files that an **Angular** app transpiles down into when you `ng build`). [AWS Simple Storage Service (S3)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html) give us the ability to host a large quantity of static content for virtually free in a **S3 bucket**. We can then distribute the contents of the **S3 bucket** through a [global content distribution network](https://en.wikipedia.org/wiki/Content_delivery_network) **AWS** manages called [CloudFront](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-cloudfront-walkthrough.html).

This is how the **Cumberland Cloud** hosts its website. We think the numbers speak for themselves. Last month, the entire bill for [https://cumberland-cloud.com](https://cumberland-cloud.com) was _$0.70_. By contrast, the lowest monthly charges for an **EC2** you will find are between _$18_ - _$30_, depending on the CPU and memory specifications.

## Prerequisites

There are several things you will need to set up manually in your **AWS** account before we proceed.

### Domain & Hosted Zone

You will need to purchase a domain name and set up a hosted zone for that domain. [When you register a domain through AWS Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html), AWS will automatically provision a hosted zone for you. If you already own a domain through a different registrate, you will need to [setup the hosted zone yourself](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/MigratingDNS.html).

Once the hosted zone is provisioned and setup, note the physical ID for later,

![](https://cumberland-cloud.com/assets/imgs/articles/aws_hosted_zone_id.png)

### TLS/SSL Certificate

In order to setup a secure website through **HTTPS**, you will need a valid certificate from an authorized [Certificate Authority](https://en.wikipedia.org/wiki/Certificate_authority). Without a valid SSL certificate, visitors to your site will get a warning their connection is insecure and attackers may be trying to steal their information.

**AWS** issues its own certificates through the [AWS Cerfiticate Manager (ACM)](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html). The easiest way to setup **HTTPS** for your **S3-Cloudfront** distribution is to provision a certificate through the **ACM**. [Follow the instructions in the official documentation](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) to setup an SSL certificate.

If you registered `example.com` as your domain, then you will need to request a certificate for `*.example.com`. While not technically neccessary for the current scope, the wildcard will allow the certificate to valid any requests to subdomains within your domain, such as `api.example.com` or `app.example.com`. In a future entry to this series, we will show how to setup backend functionality via [AWS APIGateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) and doing this now will save us future headaches.

Once the certificate is provisioned (this may take up to a day if your domain isn't registered through **Route53**), note the [AWS Resource Name (ARN)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) of the certificate,

![](https://cumberland-cloud.com/assets/imgs/articles/aws_certificate_arn.png)

## CloudFormation

TODO

## Prerendering & CloudFront Edge Functions

If you are building the **Angular** app with `ng build`, at this point, you have a fully functional website. You can stop reading, upload the contents of the _dist_ folder to your **S3** bucket and call it a day. However, you may have a project on your hands that requires prerendering.

One of the major drawbacks of a [Single Page Application (SPA)]() is it renders client-side, meaning the application doesn't fully construct the [Document Object Model (DOM)]() (i.e. the HTML document structure) until the files have been delivered over the internet to the user's computer; Javascripts that run locally on the user's browser construct the majority of the webpage. This presents a problem to web crawlers, like [Googlebot](), that rely on the **DOM** and static content to index websites. While web crawlers have made strides in recent years with rendering javascript, **SPA**s are still effectively invisible to most search engines, if additional steps are not taken.

This is where the concept of _prerendering_ comes into play. [Angular Universal]() is a library that renders **Angular** applications server side before they are distributed over the internet. (For more information on implementing **Angular Universal** and _prerendering_ in your app, see [the tutorial found here]()) By \*_prerendering_, the webpages are fully formed before the user ever requests to see them. This allows web crawlers and search engines to find your site.

However, in typical fashion, this presents another problem. Luckily, there is a nice, neat, out-of-the-box solution for this particular problem.

When an **Angular** application is prerendered, it will generate an _index.html_ for each route, as opposed to a normal **Angular** build that compiles a singe _index.html_ and bootstraps the entire application from that entrypoint. In order to accomodate this difference, the **CloudFront** distribution will need to be setup to append `index.html` to the end of all routes, so that will be serve the correct index on each path. If unchanged, the default configuration will serve the root _index.html_ and then pass the routing to the **Angular** app, instead of loading that route's _index_ and bootstrapping from there. This would effectively make the _prerendering_ process moot, since the static html generated by the prerender would not be served by the **Cloudfront** distribution.

You will need to set up **CloudFront** edge functions for each route using [the procedure described in the official AWS documentation found here](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html).
