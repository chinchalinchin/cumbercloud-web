export const assetSrcs=[
  "/assets/banners/money-banner.jpg",
  "/assets/banners/circuitry-banner.jpg",
  "/assets/banners/expertise-banner.jpg",
  "/assets/banners/human_centric_design-banner.jpg",
  "/assets/imgs/separated.jpg",
  "/assets/imgs/cloud_tunnel.jpg"
]

export interface ChipConfig{
  tooltip: string,
  href: string,
  svgIcon: string
};

export interface Link{
  href: string,
  display: string
}
export interface Experience{
  company: string,
  position: string,
  years: string,
  responsibilities: string[],
  accomplishments?: string[],
  links?: Link[]
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
    years: "2021 - Current",
    responsibilities: [
      "Oversaw development operations for the <b>Innovation Lab</b>",
      "Led a Scrum team in a fast-paced environment ",
      "Built prototype, proof-of-concept applications",
      "Provided solution proposals for prospective clients"
    ],
    accomplishments: [
      "Won multiple contract bids via code challenges",
      "Designed and implemented a multi-environment cloud architecture",
      "Practiced the displicine of test-driven development"
    ],
    links:[
      {
        href: "https://makpar.com",
        display: "Makpar Corporation"
      },
      {
        href: "https://laboratory-dev.makpar-innovation.net",
        display: "Innovation Lab Dev Site"
      },
      {
        href: "https://documentation.makpar-innovation.net",
        display: "Innovation Lab Documentation"
      },
      {
        href: "https://www.tripointsolutions.com/announcements/tripoint-solutions-select-as-a-new-supplier-for-comet",
        display: "COMET Contract Award, 2022"
      },
    ]
  },
  {
    company: "IBM",
    position: "Full Stack Developer",
    years: "2019 - 2021",
    responsibilities: [
      "Worked in a Scrum team to develop web applications",
      "Designed and implemented frontend user interfaces",
      "Managed development pipelines for continuous deployment"
    ],
    accomplishments: [
      "Vital in the migration of GSA's COMET portfolio to the cloud",
      "Modernized and containerized multiple legacy applications",
      "Trained new developers in the <b>Innovation Garage</b>"
    ],
    links:[
      {
        href: "https://buy.gsa.gov",
        display: "Buy@GSA"
      },
      {
        href: "https://calc.gsa.gov",
        display: "CALC"
      },
      {
        href: "https://sam.gov",
        display: "SAM"
      }
    ]
  },
  {
    company: "Front Range Community College",
    position: "Mathematics Professor",
    years: "2017 - 2018",
    responsibilities: [
      "MAT 050 Quantitative Literary", 
      "MAT 120 Math For Liberal Arts", 
      "MAT 125 Survey of Calculus", 
      "MAT 135 Introduction to Statistics", 
      "MAT 201 Calculus I"],
  },
  {
    company: "University of Cincinnati",
    position: "Adjunct Mathematics Professor",
    years: "2017",
    responsibilities: [
      "MATH 0080 Fundamentals of Algebra", 
      "MATH 1008 Quantitative Logic", 
      "BANA 2081 Business Analytics"
    ],
  },
  {
    company: "Frostburg State University",
    position: "Adjunct Physics Professor",
    years: "2015 - 2017",
    responsibilities: [
      "PHYS 215 General Physics I", 
      "PHYS 216 General Physics II", 
      "PHYS 261 Principle of Physics I: Introduction to Mechanics"
    ]
  },
  {
    company: "Allegany College of Maryland",
    position: "Mathematics Professor",
    years: "2015 - 2016",
    responsibilities: [
      "MATH 83 Basic Arithmetic", 
      "MATH 90 Pre-Algebra",
      "MATH 93 Intermediate Algebra"
    ],
  },
  {
    company: "Americorps",
    position: "Mathematics Mentor",
    years: "2014 - 2016",
    responsibilities: [],
    accomplishments: []
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