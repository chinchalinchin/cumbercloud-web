export interface ChipConfig{
  tooltip: string,
  href: string,
  svgIcon: string
};

export const INFRASTRUCTURE_CHIPS: ChipConfig [] = [
  { tooltip:'AWS CloudFront', href: 'https://aws.amazon.com/cloudfront/', svgIcon: 'cloudfront'},
  { tooltip:'AWS S3', href: 'https://aws.amazon.com/S3/', svgIcon: 's3'},
  { tooltip:'AWS Cognito', href: 'https://aws.amazon.com/cognito', svgIcon: 'cognito'},
  { tooltip:'AWS Lambda', href: 'https://aws.amazon.com/lambda/', svgIcon: 'lambda'},
  { tooltip:'AWS DynamoDB', href: 'https://aws.amazon.com/dynamodb/', svgIcon: 'dynamodb'},
];

export const DESIGN_CHIPS: ChipConfig[] = [
  { tooltip:'Draw.io Diagram', href: 'https://www.diagrams.net/', svgIcon: 'drawio'},
  { tooltip:'Adobe XD', href: 'https://www.adobe.com/products/xd.html', svgIcon: 'xd'},
  { tooltip:'GNU Image Manipulation Program', href: 'https://www.gimp.org/', svgIcon: 'gimp'},
];

export const SOFTWARE_CHIPS: ChipConfig[] = [
  { tooltip:'Angular', href: 'https://angular.io/', svgIcon: 'angular'},
  { tooltip:'Django', href: 'https://www.djangoproject.com/', svgIcon: 'django'},
  { tooltip:'Docker', href: 'https://www.docker.com/', svgIcon: 'docker'},
];

export const TECHNOLOGY_CHIPS: ChipConfig[] =[
  { tooltip: "Python", href: "", svgIcon:"python"},
  { tooltip: "Typescript", href: "", svgIcon:"typescript"}
];