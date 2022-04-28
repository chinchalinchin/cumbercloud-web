/////////////
// INTERFACES
/////////////

export interface AssetConfig {
  src: string;
  alt: string;
}

export interface NavConfig {
  path: string;
  nav_title: string;
  page_title: string;
  page_description: string;
  menu: boolean;
  data: any;
}

export interface IconConfig {
  src: string;
  name: string;
}

export interface ChipConfig {
  tooltip: string;
  href: string;
  svgIcon: string;
}

export interface Link {
  href: string;
  display: string;
}

export interface Experience {
  company: string;
  position: string;
  years: string;
  responsibilities: string[];
  accomplishments?: string[];
  links?: Link[];
}

export interface PricingParameter {
  type: string;
  label?: string;
  states?: number;
  state_descriptions?: string[];
  state_titles?: string[];
}

export interface Fee {
  service: string;
  rate: number;
  justification: string;
  basis: string;
  href: string;
}

export interface Pricing {
  key: string;
  name: string;
  parameter: PricingParameter;
  fees: Fee[];
  rate: number;
  tooltip: string;
}

export interface Certification {
  title: string;
  src: string;
  alt: string;
}

export interface ContactReason {
  reason: string;
  key: string;
  option_text?: string;
  options_exclusive?: boolean;
  options?: string[];
}

////////
// ENUMS
////////

export enum ResumePopUpStates {
  one = 0,
  two = 1,
  three = 2,
  four = 3,
  null = -1,
}

export enum ExperienceStates {
  makpar = 'makpar',
  ibm = 'ibm',
  frcc = 'frcc',
  uc = 'uc',
  fsu = 'fsu',
  acm = 'acm',
  americorps = 'americorps',
}

////////////////
// CONFIGURATION
////////////////

export const NAV_CONFIG: NavConfig[] = [
  {
    path: '/',
    nav_title: 'Home',
    page_title: 'The Cumberland Cloud',
    page_description:
      'The Cumberland Cloud specializes in cloud native design and development. Using the latest technology, we create responsive web pages with unique designs and quality user experiences.',
    menu: true,
    data: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: 'https://cumberland-cloud.com',
        logo: 'https://cumberland-cloud.com/assets/icons/cloud-03.svg',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        image: [
          'https://cumberland-cloud.com/assets/imgs/circuitry-banner.jpg',
          'https://cumberland-cloud.com/assets/imgs/expertise-banner.jpg',
          'https://cumberland-cloud.com/assets/imgs/human_centric_design-banner.jpg',
        ],
        name: 'The Cumberland Cloud',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '401 North Mechanic Street',
          addressLocality: 'Cumberland',
          addressRegion: 'MD',
          postalCode: '21502',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 39.656087,
          longitude: -78.76781,
        },
        url: 'http://www.cumberland-cloud.com',
        telephone: '+13016979801',
        priceRange: '$',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:30',
            closes: '17:30',
          },
        ],
      },
    ],
  },
  {
    path: '/about',
    nav_title: 'About',
    page_title: 'Cumberland Cloud - About Grant Moore',
    page_description:
      'Grant Moore is a Solution Architect, Web Developer and UI/UX Designer. With a background in mathematics and physics, he approaches every software problem with a unique perspective, bringing to it a diverse array of analytical tools. Schedule a consultation at design@cumberland-cloud.com',
    menu: true,
    data: {},
  },
  {
    path: '/design',
    nav_title: 'Design',
    page_title: 'The Cumberland Cloud - Design',
    page_description:
      'The Cumberland Cloud allows your business to take advantage of our years of production-grade software engineering experience. We take pride in our professionalism and as a result, our design process stands out from the rest of the crowd',
    menu: true,
    data: {},
  },
  {
    path: '/pricing',
    nav_title: 'Pricing',
    page_title: 'The Cumberland Cloud - Pricing',
    page_description:
      'Find out how much your next project with the Cumberland Cloud will cost. Input your project details into our Project Cost Calculator to get an instant estimate.',
    menu: true,
    data: {},
  },
  {
    path: '/contact',
    nav_title: 'Contact',
    page_title: 'The Cumberland Cloud - Contact',
    page_description:
      'Submit a form message with details about your next web development project to the Cumberland Cloud',
    menu: true,
    data: {},
  },
  {
    path: '/about/resume',
    nav_title: 'Resume',
    page_title: 'The Cumberland Cloud - Grant Moore, Resume',
    page_description:
      'Grant Moore is the Solution Arhitect, Lead Developer and UI/UX Designer for the Cumberland Cloud. Read details about his career, certifications and education here.',
    menu: false,
    data: {},
  },
];

export const ASSET_CONFIG: AssetConfig[] = [
  {
    src: '/assets/imgs/money-banner.jpg',
    alt: 'Money, Money, Money',
  },
  {
    src: '/assets/imgs/circuitry-banner.jpg',
    alt: 'Cloud Computing',
  },
  {
    src: '/assets/imgs/expertise-banner.jpg',
    alt: 'Expert Services',
  },
  {
    src: '/assets/imgs/human_centric_design-banner.jpg',
    alt: 'Human Centered Design',
  },
  {
    src: '/assets/imgs/separated.jpg',
    alt: 'Cumberland Cloud Stands Apart',
  },
  {
    src: '/assets/imgs/cloud_tunnel.jpg',
    alt: 'Tunnel To The Clouds',
  },
  {
    src: '/assets/imgs/under_construction.jpg',
    alt: 'Site Under Construction',
  },
  {
    src: '/assets/people/grant/profile.jpg',
    alt: 'Grant Moore: Solution Architect, Developer & Designer',
  },
];

export const TOOL_CHIPS: ChipConfig[] = [
  {
    tooltip: 'Adobe XD',
    href: 'https://www.adobe.com/products/xd.html',
    svgIcon: 'xd',
  },
  {
    tooltip: 'GNU Image Manipulation Program',
    href: 'https://www.gimp.org/',
    svgIcon: 'gimp',
  },
  { tooltip: 'Diagrams', href: 'https://www.diagrams.net/', svgIcon: 'drawio' },
  {
    tooltip: 'Typescript',
    href: 'https://www.typescriptlang.org/',
    svgIcon: 'typescript',
  },
  { tooltip: 'Python', href: 'https://www.python.org/', svgIcon: 'python' },
  { tooltip: 'Angular', href: 'https://angular.io/', svgIcon: 'angular' },
  {
    tooltip: 'Django',
    href: 'https://www.djangoproject.com/',
    svgIcon: 'django',
  },
  { tooltip: 'Docker', href: 'https://www.docker.com/', svgIcon: 'docker' },
  {
    tooltip: 'CloudFront',
    href: 'https://aws.amazon.com/cloudfront/',
    svgIcon: 'cloudfront',
  },
  { tooltip: 'S3', href: 'https://aws.amazon.com/S3/', svgIcon: 's3' },
  {
    tooltip: 'Lambda',
    href: 'https://aws.amazon.com/lambda/',
    svgIcon: 'lambda',
  },
  {
    tooltip: 'API Gateway',
    href: 'https://aws.amazon.com/api-gateway/',
    svgIcon: 'apigateway',
  },
];

export const ICON_CONFIG: IconConfig[] = [
  {
    src: '../assets/icons/aws-apigateway.svg',
    name: 'apigateway',
  },
  {
    src: '../assets/icons/angular.svg',
    name: 'angular',
  },
  {
    src: '../assets/icons/aws-cognito.svg',
    name: 'cognito',
  },
  {
    src: '../assets/icons/flow-charts.svg',
    name: 'drawio',
  },
  {
    src: '../assets/icons/aws-dynamodb.svg',
    name: 'dynamodb',
  },
  {
    src: '../assets/icons/docker-round.svg',
    name: 'docker',
  },
  {
    src: '../assets/icons/django.svg',
    name: 'django',
  },
  {
    src: '../assets/icons/github.svg',
    name: 'github',
  },
  {
    src: '../assets/icons/gimp-color.svg',
    name: 'gimp',
  },
  {
    src: '../assets/icons/html5.svg',
    name: 'html',
  },
  {
    src: '../assets/icons/aws-lambda.svg',
    name: 'lambda',
  },
  {
    src: '../assets/icons/pypi.svg',
    name: 'pypi',
  },
  {
    src: '../assets/icons/python.svg',
    name: 'python',
  },
  {
    src: '../assets/icons/aws-rds.svg',
    name: 'rds',
  },
  {
    src: '../assets/icons/aws-s3.svg',
    name: 's3',
  },
  {
    src: '../assets/icons/typescript/svg',
    name: 'typescript',
  },
  {
    src: '../assets/icons/adobe-xd.svg',
    name: 'xd',
  },
];

export const EXPERIENCE_CONFIG: Experience[] = [
  {
    company: 'Makpar, Inc.',
    position: 'DevOps Engineer',
    years: '2021 - Current',
    responsibilities: [
      'Oversaw development operations for the <b>Innovation Lab</b>',
      'Led a Scrum team in a fast-paced environment',
      'Built prototype, proof-of-concept applications',
      'Provided solution proposals for prospective clients',
    ],
    accomplishments: [
      'Won multiple contract bids via code challenges',
      'Designed and implemented a multi-environment cloud architecture',
      'Enforced test-driven development through CI/CD best practices',
    ],
    links: [
      {
        href: 'https://makpar.com',
        display: 'Makpar Corporation',
      },
      {
        href: 'https://laboratory-dev.makpar-innovation.net',
        display: 'Innovation Lab Dev Site',
      },
      {
        href: 'https://documentation.makpar-innovation.net',
        display: 'Innovation Lab Documentation',
      },
      {
        href: 'https://www.tripointsolutions.com/announcements/tripoint-solutions-select-as-a-new-supplier-for-comet',
        display: 'COMET Contract Award, 2022',
      },
    ],
  },
  {
    company: 'IBM',
    position: 'Full Stack Developer',
    years: '2019 - 2021',
    responsibilities: [
      'Worked in a Scrum team to develop web applications',
      'Designed and implemented frontend user interfaces',
      'Managed development pipelines for continuous deployment',
    ],
    accomplishments: [
      "Vital in the migration of GSA's COMET portfolio to the cloud",
      'Modernized and containerized multiple legacy applications',
      'Trained new developers in the <b>Innovation Garage</b>',
    ],
    links: [
      {
        href: 'https://buy.gsa.gov',
        display: 'Buy@GSA',
      },
      {
        href: 'https://calc.gsa.gov',
        display: 'CALC',
      },
      {
        href: 'https://sam.gov',
        display: 'SAM',
      },
    ],
  },
  {
    company: 'Front Range Community College',
    position: 'Mathematics Professor',
    years: '2017 - 2018',
    responsibilities: [
      'MAT 050 Quantitative Literary',
      'MAT 120 Math For Liberal Arts',
      'MAT 125 Survey of Calculus',
      'MAT 135 Introduction to Statistics',
      'MAT 201 Calculus I',
    ],
  },
  {
    company: 'University of Cincinnati',
    position: 'Adjunct Mathematics Professor',
    years: '2017',
    responsibilities: [
      'MATH 0080 Fundamentals of Algebra',
      'MATH 1008 Quantitative Logic',
      'BANA 2081 Business Analytics',
    ],
  },
  {
    company: 'Frostburg State University',
    position: 'Adjunct Physics Professor',
    years: '2015 - 2017',
    responsibilities: [
      'PHYS 215 General Physics I',
      'PHYS 216 General Physics II',
      'PHYS 261 Principle of Physics I: Introduction to Mechanics',
    ],
  },
  {
    company: 'Allegany College of Maryland',
    position: 'Mathematics Professor',
    years: '2015 - 2016',
    responsibilities: [
      'MATH 83 Basic Arithmetic',
      'MATH 90 Pre-Algebra',
      'MATH 93 Intermediate Algebra',
    ],
  },
  {
    company: 'Americorps',
    position: 'Mathematics Mentor',
    years: '2014 - 2016',
    responsibilities: [],
    accomplishments: [],
  },
];

export const CERTIFICATION_CONFIG: Certification[] = [
  {
    title: 'AWS DevOps Engineer Professional',
    src: '/assets/certs/AWS_DEVOPS.png',
    alt: 'Amazon Web Services DevOps Engineer Professional Certification',
  },
  {
    title: 'AWS Developer Associate',
    src: '/assets/certs/AWS_DEVELOPER.png',
    alt: 'Amazon Web Services Developer Associate Certification',
  },
  {
    title: 'MTA Database Administration',
    src: '/assets/certs/MTA_DATABASE.png',
    alt: 'Microsoft Technology Associate Database Administration Certification',
  },
  {
    title: 'MTA Software Development',
    src: '/assets/certs/MTA_SOFTWARE.png',
    alt: 'Microsoft Technology Associate Software Development Fundamentals Certification',
  },
  {
    title: 'MTA Python Programming',
    src: '/assets/certs/MTA_PYTHON.png',
    alt: 'Microsoft Technology Associate Introduction to Python Programming Certification',
  },
  {
    title: 'MTA Java Programming',
    src: '/assets/certs/MTA_JAVA.png',
    alt: 'Microsoft Technology Associate Introduction to Java Programming Certification',
  },
];

export const CORE_PRICING_CONFIG: Pricing[] = [
  {
    key: 'DESIGN',
    name: 'Design & Hosting',
    parameter: {
      type: 'number',
      label: 'Number of pages',
      state_descriptions: [
        'Static content can be hosted on the cloud for practically free these days, so the main expense here comes from the design and implementation of the content itself.',
      ],
      state_titles: ['Description'],
    },
    rate: 250,
    fees: [
      {
        service: 'AWS CloudFront',
        rate: 0.085,
        justification: 'Website Hosting',
        basis: 'Per GB transferred to the internet',
        href: 'https://aws.amazon.com/cloudfront/pricing/',
      },
    ],
    tooltip: 'Charges per page',
  },
  {
    key: 'INVENT',
    name: 'Inventory Management',
    parameter: {
      type: 'slider',
      label: 'Complexity of inventory',
      states: 3,
      state_descriptions: [
        'Accessed infrequently by select users and contains less than ten thousand records.',
        'Accessed daily by a group of users and contains on the order of a hundred thousand records.',
        'Accessed multiple times a day by a community of users and contains millions of records.',
      ],
      state_titles: ['Small', 'Medium', 'Large'],
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0.2,
        justification: 'Business Logic',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/lambda/pricing/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 0.25,
        justification: 'Data Storage',
        basis: 'Per GB Per Month',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 1.25,
        justification: 'Data Access',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
    ],
    rate: 2500,
    tooltip: 'Charges based on complexity',
  },
  {
    key: 'MARKET',
    name: 'Online Marketplace',
    parameter: {
      type: 'slider',
      label: 'Complexity of transactions',
      states: 3,
      state_descriptions: [
        'Basic transaction order flow. Orders are processed as soon as they are received.',
        'Asynchronous transaction order flow. Orders are not processed until conditions are met.',
        'Intensive transaction order flow with multiple parties. Numerous transactions in small time frames. Order history must be consistent and immutable.',
      ],
      state_titles: ['Simple', 'Complex', 'Network'],
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0.2,
        justification: 'Business Logic',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/lambda/pricing/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 0.25,
        justification: 'Data Storage',
        basis: 'Per GB Per Month',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 1.25,
        justification: 'Data Access',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
      {
        service: 'Stripe',
        rate: 0.029,
        justification: 'Payment Processing',
        basis: 'Per Transaction',
        href: 'https://stripe.com/pricing',
      },
    ],
    rate: 1000,
    tooltip: 'Charges based on complexity',
  },
  {
    key: 'FORM',
    name: 'Form Validation & Processing',
    parameter: {
      type: 'slider',
      label: 'Complexity of form',
      states: 3,
      state_descriptions: [
        'A simple form for collecting user data or submissions. Form contains less than twenty fields.',
        'A form with conditional elements and nested sub-forms. Form contains less than a hundred fields.',
        'A form with multiple nested relationships or a form of unstructured data. Form contains more than a hundred fields.',
      ],
      state_titles: ['Basic', 'Complex', 'Unstructured'],
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0.2,
        justification: 'Business Logic',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/lambda/pricing/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 0.25,
        justification: 'Data Storage',
        basis: 'Per GB Per Month',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 1.25,
        justification: 'Data Access',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
    ],
    rate: 500,
    tooltip: 'Charges based on complexity',
  },
  {
    key: 'SCHEDULE',
    name: 'Scheduling & Notifications',
    parameter: {
      type: 'null',
      state_descriptions: [
        'Setting up scheduled jobs and notifications services in the cloud is a standard use-case and easy to implement.',
      ],
      state_titles: ['Description'],
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0.2,
        justification: 'Business Logic',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/lambda/pricing/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 0.25,
        justification: 'Data Storage',
        basis: 'Per GB Per Month',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 1.25,
        justification: 'Data Access',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
      {
        service: 'AWS Simple Email Service',
        rate: 0.1,
        justification: 'Email Server',
        basis: 'Per 1000 Emails',
        href: 'https://aws.amazon.com/ses/pricing/',
      },
    ],
    rate: 1000,
    tooltip: 'Charge based on implementation effort',
  },
];

export const ADDON_PRICING_CONFIG: Pricing[] = [
  {
    key: 'STORAGE',
    name: 'Document & Data Storage',
    parameter: {
      type: 'slider',
      label: 'Complexity of data',
      states: 3,
      state_descriptions: [
        'Your data is scalar, i.e. all values can be inputted into an Excel spreadsheet',
        'Your data includes images, videos and other forms of media.',
        'Your data is aggregated from multiple sources. Note, depending on the complexity and the desired outcome, this may require other services and extra effort.',
      ],
      state_titles: ['Easy', 'Medium', 'Hard'],
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0.2,
        justification: 'Business Logic',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/lambda/pricing/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 0.25,
        justification: 'Data Storage',
        basis: 'Per GB Per Month',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
      {
        service: 'AWS DynamoDB',
        rate: 1.25,
        justification: 'Data Access',
        basis: 'Per 1 Million Requests',
        href: 'https://aws.amazon.com/dynamodb/pricing/on-demand/',
      },
    ],
    rate: 2000,
    tooltip: 'Charges based on amount of data',
  },
  {
    key: 'SSO',
    name: 'Single Sign-On',
    parameter: {
      type: 'null',
      state_descriptions: [
        'Integrating with identity providers like Google, Facebook or Microsoft has never been easier. Most platforms offer this capability out of the box.',
      ],
      state_titles: ['Description'],
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0.2,
        justification: 'Per 1 Million Requets',
        basis: 'Business Logic',
        href: 'https://aws.amazon.com/lambda/pricing/',
      },
      {
        service: 'AWS Cognito',
        rate: 0.0055,
        justification: 'User Accounts',
        basis: 'Per Monthly Active User',
        href: 'https://aws.amazon.com/cognito/pricing/',
      },
    ],
    rate: 1000,
    tooltip: 'Charges based on number of users',
  },
  {
    key: 'EMAIL',
    name: 'Email Domain',
    parameter: {
      type: 'null',
      state_descriptions: [
        'Most cloud-based email services can be configured without hassle.',
      ],
      state_titles: ['Description'],
    },
    fees: [
      {
        service: 'AWS Lambda',
        rate: 0.2,
        justification: 'Per 1 Million Requets',
        basis: 'Business Logic',
        href: 'https://aws.amazon.com/lambda/pricing/',
      },
      {
        service: 'AWS Simple Email Service',
        rate: 0.1,
        justification: 'Email Server',
        basis: 'Per 1000 Emails',
        href: 'https://aws.amazon.com/ses/pricing/',
      },
    ],
    rate: 1000,
    tooltip: 'Charges based on amount of email traffic',
  },
];

export const ANALYTICS_PRICING_CONFIG: Pricing[] = [
  {
    key: 'SEO',
    name: 'Search Engine Optimization',
    parameter: {
      type: 'number',
      label: 'Number of pages',
      state_descriptions: [
        "Assuming static content, SEO is a one-time process. If you are updating content on a regular basis, SEO becomes more complex. All of our custom pages are automatically SEO'ed by default, but if you are using a CMS like WordPress or Drupal, this process will involve several manual steps each time content is updated.",
      ],
      state_titles: ['Description'],
    },
    fees: [],
    rate: 100,
    tooltip: 'Charges based on number of pages optimized',
  },
  {
    key: 'DEMO',
    name: 'User Traffic Demographics',
    parameter: {
      type: 'number',
      label: 'Number of pages',
      state_descriptions: [
        'Measuring user traffic on a domain and generating demographics is straight-forward. If you require more in-depth analytics, such as how long a user interacts with a particular element on your website or which elements are most likely to lead to conversion, this will require a more thorough accounting of your website.',
      ],
      state_titles: ['Description'],
    },
    fees: [],
    rate: 100,
    tooltip: 'Charges based on number of pages',
  },
];

export const REASON_CONFIG: ContactReason[] = [
  {
    reason: 'new website for my business.',
    key: 'NEW_WEB',
  },
  {
    reason: 'new application for my business.',
    key: 'NEW_APP',
  },
  {
    reason: 'existing website serviced.',
    key: 'OLD_WEB',
    option_text: 'How is the website hosted?',
    options_exclusive: true,
    options: [
      'WordPress',
      'Wix',
      'Squarespace',
      'Cloud (AWS, Azure, etc.)',
      'Other',
    ],
  },
  {
    reason: 'existing application serviced.',
    key: 'OLD_APP',
    option_text: 'What are the components of your application?',
    options_exclusive: false,
    options: [
      'Database Server',
      'Web Server',
      'Container Cluster',
      'Content Management System (e.g. Drupal, WordPress, etc.)',
      'Single Sign-On',
      'Search Engine',
      'Machine Learning',
    ],
  },
  {
    reason: 'existing website migrated to the cloud.',
    key: 'MIGRATE_WEB',
    option_text: 'How is the website hosted?',
    options_exclusive: false,
    options: ['WordPress', 'Wix', 'Squarespace', 'Other'],
  },
  {
    reason: 'existing application migrated to the cloud.',
    key: 'MIGRATE_APP',
    option_text: 'Does the application need modernized?',
    options_exclusive: true,
    options: ['yes', 'no'],
  },
];
