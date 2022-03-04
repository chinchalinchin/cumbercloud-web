export interface ChipConfig{
  tooltip: string,
  href: string,
  svgIcon: string
};

export const INFRASTRUCTURE_CHIPS: ChipConfig [] = [
  { tooltip:'CloudFront', href: 'https://aws.amazon.com/cloudfront/', svgIcon: 'cloudfront'},
  { tooltip:'Cognito', href: 'https://aws.amazon.com/cognito', svgIcon: 'cognito'},
  { tooltip:'DynamoDB', href: 'https://aws.amazon.com/dynamodb/', svgIcon: 'dynamodb'},
  { tooltip:'Lambda', href: 'https://aws.amazon.com/lambda/', svgIcon: 'lambda'},
  { tooltip:'S3', href: 'https://aws.amazon.com/S3/', svgIcon: 's3'},
];

export const DESIGN_CHIPS: ChipConfig[] = [
  { tooltip:'Diagrams', href: 'https://www.diagrams.net/', svgIcon: 'drawio'},
  { tooltip:'Adobe XD', href: 'https://www.adobe.com/products/xd.html', svgIcon: 'xd'},
  { tooltip:'GNU Image Manipulation Program', href: 'https://www.gimp.org/', svgIcon: 'gimp'},
];

export const SOFTWARE_CHIPS: ChipConfig[] = [
  { tooltip:'Angular', href: 'https://angular.io/', svgIcon: 'angular'},
  { tooltip:'Docker', href: 'https://www.docker.com/', svgIcon: 'docker'},
  { tooltip:'Django', href: 'https://www.djangoproject.com/', svgIcon: 'django'},
];

export const TECHNOLOGY_CHIPS: ChipConfig[] =[
  { tooltip: 'HTML5', href: "", svgIcon: "html" },
  { tooltip: "Typescript", href: "", svgIcon:"typescript"},
  { tooltip: "Python", href: "", svgIcon:"python"},
];