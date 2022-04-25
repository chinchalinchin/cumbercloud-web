/////////////
// INTERFACES
/////////////

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

export interface PricingParameter{
  type: string,
  label?: string,
  states?: number
  state_descriptions?: string[],
  state_titles?: string[]
}

export interface Fee{
  service: string,
  rate: number,
  justification: string,
  basis: string,
}

export interface Pricing{
  key: string,
  name: string,
  parameter: PricingParameter,
  fees: Fee[],
  rate: number,
  tooltip: string,
  description: string
}

export interface Certification{
  title: string,
  src: string,
  alt: string
}

////////
// ENUMS
////////

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

////////////
// CONSTANTS
////////////

export const assetSrcs=[
  "/assets/imgs/money-banner.jpg",
  "/assets/imgs/circuitry-banner.jpg",
  "/assets/imgs/expertise-banner.jpg",
  "/assets/imgs/human_centric_design-banner.jpg",
  "/assets/imgs/separated.jpg",
  "/assets/imgs/cloud_tunnel.jpg"
];

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
];

export const EXPERIENCE_CONFIG : Experience[] = [
  {
    company: "Makpar, Inc.",
    position: "DevOps Engineer",
    years: "2021 - Current",
    responsibilities: [
      "Oversaw development operations for the <b>Innovation Lab</b>",
      "Led a Scrum team in a fast-paced environment",
      "Built prototype, proof-of-concept applications",
      "Provided solution proposals for prospective clients"
    ],
    accomplishments: [
      "Won multiple contract bids via code challenges",
      "Designed and implemented a multi-environment cloud architecture",
      "Enforced test-driven development through CI/CD best practices"
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

export const CORE_PRICING_CONFIG: Pricing[] = [
  { 
    key: 'ADVERT',
    name: 'Advertising & Branding',
    parameter:{
      type: 'number',
      label: 'Number of pages'
    },
    rate: 250,
    fees:[
      {
        service: "AWS CloudFront",
        rate: 0,
        justification: "",
        basis: ""
      }
    ],
    tooltip: '',
    description: ''
  },
  {
    key: 'INVENT',
    name: 'Inventory Management',
    parameter: {
      type: 'slider',
      label: 'Complexity of inventory',
      states: 3,
      state_descriptions: [
        "Accessed infrequently by select users and contains less than ten thousand records.",
        "Accessed daily by a group of users and contains on the order of a hundred thousand records.",
        "Accessed multiple times a day by a community of users and contains millions of records."
      ],
      state_titles: [
        "Small",
        "Medium",
        "Large"
      ]
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0,
        justification: "",
        basis: ""
      },
      {
        service: "AWS DynamoDB",
        rate: 0,
        justification: "",
        basis: ""
      }
    ],
    rate: 2500,
    tooltip: '',
    description: ''
  },
  {
    key: 'MARKET',
    name: 'Online Marketplace',
    parameter:{
      type: 'slider',
      label: 'Complexity of transactions',
      states: 3,
      state_descriptions:[
        "Basic transaction order flow. Order is processed as soon as it is received.",
        "Asynchronous transaction order flow. Order is not processed until conditions are met.",
        "Intensive transaction order flow with multiple parties. Numerous transactions in small time frames. Order history must be consistent and immutable."

      ],
      state_titles:[
        "Simple",
        "Complex",
        "Network"
      ]
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0,
        justification: "",
        basis: ""
      },
      {
        service: "AWS DynamoDB",
        rate: 0,
        justification: "",
        basis: ""
      },
      {
        service: "Stripe",
        rate: 0,
        justification: "",
        basis: "Per transaction"
      }
    ],
    rate: 1000,
    tooltip: '',
    description: ''
  },
  {
    key: 'FORM',
    name: 'Form Validation & Processing',
    parameter:{
      type: 'slider',
      label: 'Complexity of form',
      states: 3,
      state_descriptions: [
        "A simple form for collecting user data or submissions. Form contains less than twenty fields.",
        "A form with conditional elements and nested sub-forms. Form contains less than a hundred fields.",
        "A form with multiple nested relationships or unstructured data. Form contains more than a hundred fields."
      ],
      state_titles: [
        "Basic",
        "Complex",
        "Unstructured"
      ]
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0,
        justification: "",
        basis: ""
      },
      {
        service: "AWS DynamoDB",
        rate: 0,
        justification: "",
        basis: ""
      }
    ],
    rate: 500,
    tooltip: '',
    description: ''
  },
  {
    key: 'SCHEDULE',
    name: 'Scheduling & Notifications',
    parameter: {
      type: 'null'
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0,
        justification: "",
        basis: ""
      },
      {
        service: "AWS DynamoDB",
        rate: 0,
        justification: "",
        basis: ""
      },
      {
        service: 'AWS Simple Email Service',
        rate: 0,
        justification: "",
        basis: ""
      }
    ],
    rate: 1000,
    tooltip: '',
    description: ''
  }
];

export const ADDON_PRICING_CONFIG: Pricing[] = [
  {
    key: 'STORAGE',
    name: 'Document & Data Storage',
    parameter: {
      type: 'slider',
      label: 'Amount of data',
      states: 5
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0,
        justification: "",
        basis: ""
      },
      {
        service: "AWS DynamoDB",
        rate: 0,
        justification: "",
        basis: ""
      }
    ],
    rate: 2000,
    tooltip: '',
    description: ''
  },
  {
    key: 'SSO',
    name: 'Single Sign-On',
    parameter: {
      type: 'null'
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0,
        justification: "",
        basis: ""
      },
      {
        service: "AWS Cognito",
        rate: 0,
        justification: "",
        basis: ""
      }
    ],
    rate: 1000,
    tooltip: '',
    description: ''
  },
  {
    key: 'EMAIL',
    name: 'Personal Email Domain',
    parameter: {
      type: 'null'
    },
    fees: [
      {
        service: 'AWS Simple Email Service',
        rate: 0,
        justification: "",
        basis: ""
      }
    ],
    rate: 500,
    tooltip: '',
    description: ''
  }
];

export const ANALYTICS_PRICING_CONFIG: Pricing[] = [
  {
    key: "SEO",
    name: "Search Engine Optimization",
    parameter:{
      type: 'number',
      label: 'Number of pages'
    },
    fees: [],
    rate: 100,
    tooltip: '', 
    description: ''
  },
  {
    key: "DEMO",
    name: "User Traffic Demographics",
    parameter:{
      type: 'null'
    },
    fees: [],
    rate: 100,
    tooltip: '',
    description: ''
  },
  {
    key: "META",
    name: "Metadata Extraction",
    parameter: {
      type: 'null'
    },
    fees: [],
    rate: 1000,
    tooltip: '',
    description: ''
  }
];