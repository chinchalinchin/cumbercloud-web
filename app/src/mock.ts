import { ArticleConfig, NavConfig } from "./models";

export const ARTICLE_NAV_CONFIG: NavConfig = {
      path: '/blog/article/angular_on_aws',
      page_title: 'The Cumberland Cloud - Angular on AWS',
      page_description:
        'In this article we explain how to setup a cloud environment to run an Angular single page application. We use a S3 Cloudfront distribution to host a static website. We go over the CloudFormation template to provision the entire stack.',
      data: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          url: 'https://cumberland-cloud.com',
          logo: 'https://cumberland-cloud.com/assets/svgs/icons/cloud-03.svg',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: 'Learn How to Deploy an Angular SPA onto AWS',
          image: [
            'https://cumberland-cloud.com/assets/imgs/covers/aws.png',
            'https://cumberland-cloud.com/assets/imgs/covers/angular.png',
            'https://cumberland-cloud/com/assets/imgs/covers/logo.png',
          ],
          datePublished: '2022-05-08T08:00:00+08:00',
          dateModified: '2015-05-09T09:20:00+08:00',
          author: [
            {
              '@type': 'Person',
              name: 'Grant Moore',
              url: 'https://cumberland-cloud.com/about/grant',
            },
          ],
        },
      ],
      meta: [
        {
          property: 'og:url',
          content: 'https://cumberland-cloud.com/blog/article/angular_on_aws',
        },
        {
          property: 'og:image',
          content: 'http://cumberland-cloud.com/assets/imgs/covers/angular.png',
        },
        {
          property: 'og:image:secure_url',
          content: 'https://cumberland-cloud.com/assets/imgs/covers/angular.png',
        },
        {
          property: 'og:image:width',
          content: '1024',
        },
        {
          property: 'og:image:height',
          content: '1024',
        },
        {
          property: 'og:image:alt',
          content: 'Cumberland Cloud - Angular on AWS',
        },
        {
          property: 'twitter:image',
          content: 'https://cumberland-cloud.com/assets/imgs/covers/angular.png',
        },
        {
          property: 'twitter:image:alt',
          content: 'Cumberland Cloud - Angular on AWS',
        },
        {
          property: 'twitter:card',
          content: 'summary',
        },
    ],
}

export const ARTICLE_CONFIG: ArticleConfig = {
      title: 'Angular on AWS',
      preview: {
        content:
          'In this article, we explain how to deploy an <strong>Angular</strong> single page application onto an <strong>AWS S3-Cloudfront</strong> distribution.',
        img: {
          id: 'angular-on-aws-img',
          src: '/assets/svgs/icons/angular.svg',
          alt: 'Get Angular running on an AWS cloud environment',
          title: 'Angular on AWS',
        },
      },
      src: '/assets/articles/angular/00_angular-aws.md',
      toc_tree: [
        {
          id: 'cost-optimization',
          title: 'Cost Optimization',
        },
        {
          id: 'setup-prerequisites',
          title: 'Setup Prerequisities',
          children: [
            {
              id: 'domain-hosted-zone',
              title: 'Domain & Hosted Zone',
            },
            {
              id: 'tls-ssl',
              title: 'SSL Certificate',
            },
          ],
        },
        {
          id: 'cloudformation',
          title: 'CloudFormation',
          children: [
            {
              id: 'cloudformation-prerequisites',
              title: ' CloudFormation Prerequisites',
            },
          ],
        },
        {
          id: 'anatomy-template',
          title: 'Anatomy of a Template',
          children: [
            {
              id: 'tldr',
              title: 'TL;DR',
            },
            {
              id: 'template',
              title: 'Template',
            },
            {
              id: 'parameters',
              title: 'Parameters',
            },
            {
              id: 's3-buckets',
              title: 'S3 Buckets',
            },
            {
              id: 'cloudfront-distribution',
              title: 'CloudFront Distribution',
            },
            {
              id: 'route53-recordset',
              title: 'Record53 Recordset',
            },
          ],
        },
        {
          id: 'cloudfront-edge',
          title: 'CloudFront Edge Functions',
        },
        {
          id: 'function-handler',
          title: 'Function Handler',
        },
        {
          id: 'series-index',
          title: 'More Articles in Series',
        },
      ],
      data: ""
};

  