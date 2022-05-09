import { ImgConfig } from '../app.config';

export interface Preview {
  content: string;
  img: ImgConfig;
}

export interface ArticleConfig {
  id: string;
  date: Date;
  title: string;
  preview: Preview;
  src: string;
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
    src: '/assets/articles/00_aws-on-angular.md',
  },
  {
    id: 'angular_aws_cicd',
    date: new Date('2022-05-08'),
    title: 'CI/CD with Angular on AWS',
    preview: {
      content: 'something',
      img: {
        id: 'angular-cicd',
        src: '/assets/svgs/pipeline.svg',
        alt: 'Continuously deploy Angular onto AWS',
        title: '',
      },
    },
    src: '/assets/articles/01_aws_cicd.md'

  }
];
  
