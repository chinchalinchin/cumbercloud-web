import { ImgConfig } from '../app.config';

// TODO: ARTICLE_CONFIG should be populate from API.

export interface Preview {
  content: string;
  img: ImgConfig;
}

export interface TOCNode {
  id: string;
  title: string;
  children?: TOCNode[];
}

export interface ArticleConfig {
  id: string;
  date: Date;
  title: string;
  preview: Preview;
  src: string;
  toc_tree: TOCNode[];
}

export const ARTICLE_CONFIG: ArticleConfig[] = [
  {
    id: 'angular_on_aws',
    date: new Date('2022-05-09'),
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
            id: 'tls-sls',
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
  },
  {
    id: 'angular_aws_cicd',
    date: new Date('2022-05-08'),
    title: 'CI/CD with Angular',
    preview: {
      content: 'something',
      img: {
        id: 'angular-cicd',
        src: '/assets/svgs/pipeline.svg',
        alt: 'Continuously deploy Angular onto AWS',
        title: '',
      },
    },
    src: '/assets/articles/angular/01_angular-cicd.md',
    toc_tree: [],
  },
  {
    id: 'angular_prerender',
    date: new Date('2022-05-07'),
    title: 'Prerendering with Angular',
    preview: {
      content: 'something',
      img: {
        id: 'angular-ssr',
        src: '/assets/svgs/pipeline.svg',
        alt: 'Continuously deploy Angular onto AWS',
        title: '',
      },
    },
    src: '/assets/articles/angular/02_angular-ssr.md',
    toc_tree: [],
  },
  {
    id: 'angular_seo',
    date: new Date('2022-05-06'),
    title: 'Search Optimization with Angular',
    preview: {
      content: 'something',
      img: {
        id: 'angular-seo',
        src: '/assets/svgs/pipeline.svg',
        alt: 'Continuously deploy Angular onto AWS',
        title: '',
      },
    },
    src: '/assets/articles/angular/03_angular-seo.md',
    toc_tree: [],
  },
];
