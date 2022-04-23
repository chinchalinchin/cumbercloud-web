export interface ChipConfig{
  tooltip: string,
  href: string,
  svgIcon: string
};

export interface Experience{
  company: string,
  position: string,
  years: string,
}

export interface Certification{
  title: string,
  src: string,
  alt: string
}

export enum ResumePopUpStates{
  one = 0, 
  two = 1, 
  three = 2, 
  four = 3, 
  null = -1
}

export enum ExperienceStates {
  makpar = "makpar", 
  ibm ="ibm", 
  frcc ="frcc", 
  uc="uc", 
  fsu="fsu", 
  acm="acm", 
  americorps="americorps"
}

export const TOOL_CHIPS: ChipConfig[] = [
  { tooltip: 'Adobe XD', href: 'https://www.adobe.com/products/xd.html', svgIcon: 'xd'},
  { tooltip: 'GNU Image Manipulation Program', href: 'https://www.gimp.org/', svgIcon: 'gimp'},
  { tooltip: 'Diagrams', href: 'https://www.diagrams.net/', svgIcon: 'drawio'},
  { tooltip: "Typescript", href: "https://www.typescriptlang.org/", svgIcon:"typescript"},
  { tooltip: "Python", href: "https://www.python.org/", svgIcon:"python"},
  { tooltip: 'Angular', href: 'https://angular.io/', svgIcon: 'angular'},
  { tooltip: 'Django', href: 'https://www.djangoproject.com/', svgIcon: 'django'},
  { tooltip: 'Docker', href: 'https://www.docker.com/', svgIcon: 'docker'},
  { tooltip: 'CloudFront', href: 'https://aws.amazon.com/cloudfront/', svgIcon: 'cloudfront'},
  { tooltip: 'S3', href: 'https://aws.amazon.com/S3/', svgIcon: 's3'},
  { tooltip: 'Lambda', href: 'https://aws.amazon.com/lambda/', svgIcon: 'lambda'},
  { tooltip: 'API Gateway', href: 'https://aws.amazon.com/api-gateway/', svgIcon: 'apigateway' },
]

export const EXPERIENCE_CONFIG : Experience[] = [
  {
    company: "Makpar, Inc.",
    position: "DevOps Engineer",
    years: "2021 - Current"

  },
  {
    company: "IBM",
    position: "Full Stack Developer",
    years: "2019 - 2021"
  },
  {
    company: "Front Range Community College",
    position: "Mathematics Professor",
    years: "2017 - 2018"
  },
  {
    company: "University of Cincinnati",
    position: "Adjunct Mathematics Professor",
    years: "2017"
  },
  {
    company: "Frostburg State University",
    position: "Adjunct Physics Professor",
    years: "2015 - 2017"
  },
  {
    company: "Allegany College of Maryland",
    position: "Mathematics Professor",
    years: "2015 - 2016"
  },
  {
    company: "Americorps",
    position: "Mathematics Mentor",
    years: "2014 - 2016"
  }
];

export const CERTIFICATION_CONFIG: Certification[] = [
  {
    title: "AWS DevOps Engineer Professional",
    src: "/assets/certs/AWS_DEVOPS.png",
    alt: "Amazon Web Services DevOps Engineer Professional Certification"
  },
  {
    title: "AWS Developer Associate",
    src: "/assets/certs/AWS_DEVELOPER.png",
    alt: "Amazon Web Services Developer Associate Certification"
  },
  {
    title: "MTA Database Administration",
    src: "/assets/certs/MTA_DATABASE.png",
    alt: "Microsoft Technology Associate Database Administration Certification"
  },
  {
    title: "MTA Software Development",
    src: "/assets/certs/MTA_SOFTWARE.png",
    alt: "Microsoft Technology Associate Software Development Fundamentals Certification"
  },
  {
    title: "MTA Python Programming",
    src: "/assets/certs/MTA_PYTHON.png",
    alt: "Microsoft Technology Associate Introduction to Python Programming Certification"
  },
  {
    title: "MTA Java Programming",
    src: "/assets/certs/MTA_JAVA.png",
    alt: "Microsoft Technology Associate Introduction to Java Programming Certification"
  }
];