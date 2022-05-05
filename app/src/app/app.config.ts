/////////////
// INTERFACES
/////////////

export interface ImgConfig {
  id: string;
  title: string;
  src: string;
  alt: string;
}

export interface LinkConfig {
  id: string;
  href: string;
  innerHTML?: string;
}

export interface StateImgConfig {
  img: ImgConfig;
  state: string;
}

export interface NavConfig {
  path: string;
  nav_id?: string;
  nav_title?: string;
  page_title?: string;
  page_description?: string;
  menu?: boolean;
  data?: any;
  children?: NavConfig[];
  meta?: MetaConfig[];
}

export interface MetaConfig {
  property: string;
  content: string;
}

export interface IconConfig {
  src: string;
  name: string;
}

export interface GalleryConfig {
  img: ImgConfig;
  link: LinkConfig;
  id: string;
  subtitle: string;
  subtitle_id: string;
  tooltip: string;
}

export interface ChipConfig {
  tooltip: string;
  href: string;
  svgIcon: string;
}


export interface ExperienceConfig {
  company: string;
  position: string;
  years: string;
  responsibilities: string[];
  accomplishments?: string[];
  links?: LinkConfig[];
}

export interface PricingParameterConfig {
  type: string;
  label?: string;
  states?: number;
  state_descriptions?: string[];
  state_titles?: string[];
}

export interface FeeConfig {
  service: string;
  rate: number;
  justification: string;
  basis: string;
  href: string;
}

export interface PricingConfig {
  key: string;
  name: string;
  parameter: PricingParameterConfig;
  fees: FeeConfig[];
  rate: number;
  tooltip: string;
  ids: string[];
}

export interface CertificationConfig {
  tab_id: string;
  title: string;
  img: ImgConfig;
}

export interface ContactConfig {
  reason: string;
  key: string;
  option_text?: string;
  options_exclusive?: boolean;
  options?: string[];
}

export interface ElementConfig {
  id: string;
  content: string;
}

export interface ProfileConfig {
  name: string;
  key: string;
  src: string;
  title: string;
  arrow_tooltip: string;
  position: string;
  blurbs: string[];
  factoids: ElementConfig[];
}

interface DesktopLine {
  moved: string;
  unmoved: string;
}

interface Line {
  mobile: string;
  desktop: DesktopLine;
}

export interface HomeConfig {
  state: string;
  img: ImgConfig;
  title: string;
  subtitle: string;
  blurb: string;
  line: Line;
}

export interface SplashConfig {
  touched: StateImgConfig;
  untouched: StateImgConfig;
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

export enum HomeStates {
  one = 'one',
  two = 'two',
  three = 'three',
  four = 'four',
}

////////////////
// CONFIGURATION
////////////////

// TODO: NavConfig for /404
export const HOME_CONFIG: HomeConfig[] = [
  {
    state: 'one',
    img: {
      src: '/assets/imgs/circuitry-banner.jpg',
      alt: 'The Cumberland Cloud uses cutting-edge technology',
      title: 'The Cumberland Cloud - Technology',
      id: 'circuitry-banner',
    },
    title: 'Web Design and Hosting',
    subtitle: 'Responsive sites built on modern technology',
    blurb:
      'The <strong>Cumberland Cloud</strong> offers custom web page design and cloud-based hosting for small business owners looking to expand their online footprint without breaking the bank.',
    line: {
      mobile:
        '- <a href="http://www.mlahanas.de/Greeks/Texts/Odyssey/Odyssey19.html" target="_blank" rel="noopener noreferrer">Homer, probably</a>',
      desktop: {
        moved: 'Custom Web Design',
        unmoved:
          '- <a href="https://www.cs.drexel.edu/~crorres/Archimedes/Lever/LeverQuotes_OLD.html" target="_blank" rel="noopener noreferrer">Archimedes, probably</a>',
      },
    },
  },
  {
    state: 'two',
    img: {
      src: '/assets/imgs/money-banner.jpg',
      alt: 'The Cumberland Cloud will save you money!',
      title: 'The Cumberland Cloud - Cost',
      id: 'money-banner',
    },
    title: 'Cloud Cost Savings',
    subtitle: 'Expert services at an affordable price',
    blurb:
      'We specialize in using the latest in serverless cloud technology to architect cost-optimized web solutions that require litte-to-no overhead or recurring fees to maintain.',
    line: {
      mobile: 'Incites the hand to push it',
      desktop: {
        moved: 'Affordable Quality',
        unmoved: 'And I will move the world',
      },
    },
  },
  {
    state: 'three',
    img: {
      src: '/assets/imgs/expertise-banner.jpg',
      alt: 'The Cumberland Cloud offers expert services',
      title: 'The Cumberland Cloud - Expertise',
      id: 'expertise-banner',
    },
    title: 'Professional Solutions',
    subtitle: 'Years of web and software design experience.',
    blurb:
      'Our team has a rich professional background in web development, with experience on production-scale projects from the leading names in the industry.',
    line: {
      mobile: 'For the button by itself',
      desktop: {
        moved: 'Cloud Expertise',
        unmoved: 'And a button big enough',
      },
    },
  },
  {
    state: 'four',
    img: {
      src: '/assets/imgs/human_centric_design-banner.jpg',
      alt: 'The Cumberland Cloud puts the user first',
      title: 'The Cumberland Cloud - Design',
      id: 'design-banner',
    },
    title: 'Human Centric Design',
    subtitle: 'User driven development process',
    blurb:
      'Every website we produce is built with your users in mind. Each detail is crafted to streamline the user experience and improve conversion for your business.',
    line: {
      mobile: '',
      desktop: {
        moved: 'User Experience',
        unmoved: 'Give me a page to land',
      },
    },
  },
];

export const SPLASH_CONFIG: StateImgConfig[] = [
  {
    state: 'untouched',
    img: {
      src: '/assets/imgs/separated.jpg',
      alt: 'The Cumberland Cloud stands apart from the crowd',
      title: 'The Cumberland Cloud is different than other development boutiques',
      id: 'separated-img'
    },
  },
  {
    state: 'touched',
    img: {
      src: '/assets/imgs/cloud_tunnel.jpg',
      alt: 'The Cumberland Cloud architects cloud-native application',
      title: 'The Cumberland Cloud is your tunnel to the cloud!',
      id: 'cloud-tunnel-img'
    } 
  }
];

export const NAV_CONFIG: NavConfig[] = [
  {
    path: '/',
    nav_title: 'Home',
    nav_id: 'home-nav',
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
    meta: [
      {
        property: 'og:url',
        content: 'https://cumberland-cloud.com/',
      },
      {
        property: 'og:image',
        content: 'http://cumberland-cloud.com/assets/imgs/logo.png',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://cumberland-cloud.com/assets/imgs/logo.png',
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
        content: 'Cumberland Cloud - Cloud Native Applications',
      },
      {
        property: 'twitter:image',
        content: 'https://cumberland-cloud.com/assets/imgs/logo.png',
      },
      {
        property: 'twitter:image:alt',
        content: 'Cumberland Cloud - Cloud Native Applications',
      },
      {
        property: 'twitter:card',
        content: 'summary',
      },
    ],
  },
  // '/about' isn't a route, but this object is used to configure the nav menu.
  {
    path: '/about',
    nav_title: 'About',
    nav_id: 'about-nav',
    page_title: 'Cumberland Cloud - About',
    page_description: 'Meet the team at Cumberland Cloud',
    menu: true,
    data: {},
    children: [
      {
        path: '/about/grant',
        nav_title: 'Grant Moore',
      },
    ],
  },
  {
    path: '/about/grant',
    page_title: 'Cumberland Cloud - About Grant Moore',
    menu: false,
    page_description:
      'Grant Moore is a Solution Architect, Web Developer and UI/UX Designer. With a background in mathematics and physics, he approaches every software problem with a unique perspective, bringing to it a diverse array of analytical tools. Schedule a consultation at design@cumberland-cloud.com',
    data: {},
    meta: [
      {
        property: 'og:url',
        content: 'https://cumberland-cloud.com/about/grant/',
      },
      {
        property: 'og:image',
        content: 'http://cumberland-cloud.com/assets/people/grant/profile.jpg',
      },
      {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://cumberland-cloud.com/assets/people/grant/profile.jpg',
      },
      {
        property: 'og:image:width',
        content: '473',
      },
      {
        property: 'og:image:height',
        content: '599',
      },
      {
        property: 'og:image:alt',
        content: 'Meet Grant Moore, the engineer behind the Cumberland Cloud',
      },
      {
        property: 'twitter:image',
        content: 'https://cumberland-cloud.com/assets/people/grant/profile.jpg',
      },
      {
        property: 'twitter:image:alt',
        content: 'Meet Grant Moore, the engineer behind the Cumberland Cloud',
      },
      {
        property: 'twitter:card',
        content: 'summary',
      },
    ],
  },
  {
    path: '/about/resume/grant',
    page_title: 'The Cumberland Cloud - Grant Moore, Resume',
    page_description:
      'Grant Moore is the Solution Arhitect, Lead Developer and UI/UX Designer for the Cumberland Cloud. Read details about his career, certifications and education here.',
    menu: false,
    data: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Grant Moore',
            item: 'https://cumberland-cloud.com/about/grant',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Resume',
            item: 'https://cumberland-cloud.com/about/resume/grant',
          },
        ],
      },
    ],
    meta: [
      {
        property: 'og:url',
        content: 'https://cumberland-cloud.com/about/resume/grant',
      },
      {
        property: 'og:image',
        content:
          'http://cumberland-cloud.com/assets/people/grant/americorps.jpg',
      },
      {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        property: 'og:image:secure_url',
        content:
          'https://cumberland-cloud.com/assets/people/grant/americorps.jpg',
      },
      {
        property: 'og:image:width',
        content: '1936',
      },
      {
        property: 'og:image:height',
        content: '1936',
      },
      {
        property: 'og:image:alt',
        content: "Grant Moore's Resume",
      },
      {
        property: 'twitter:image',
        content:
          'https://cumberland-cloud.com/assets/people/grant/americorps.jpg',
      },
      {
        property: 'twitter:image:alt',
        content: "Grant Moore's Resume",
      },
      {
        property: 'twitter:card',
        content: 'summary',
      },
    ],
  },
  {
    path: '/design',
    nav_title: 'Design',
    nav_id: 'design-nav',
    page_title: 'The Cumberland Cloud - Design',
    page_description:
      'The Cumberland Cloud has at your disposal years of production-grade software engineering experience. We take pride in our professionalism and as a result, our design process stands out from the rest of the crowd',
    menu: true,
    data: {},
    meta: [
      {
        property: 'og:url',
        content: 'https://cumberland-cloud.com/design',
      },
      {
        property: 'og:image',
        content: 'http://cumberland-cloud.com/assets/imgs/cloud_tunnel.jpg',
      },
      {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://cumberland-cloud.com/assets/imgs/cloud_tunnel.jpg',
      },
      {
        property: 'og:image:width',
        content: '5776',
      },
      {
        property: 'og:image:height',
        content: '3856',
      },
      {
        property: 'og:image:alt',
        content: "Learn about Cumberland Cloud's design process",
      },
      {
        property: 'twitter:image',
        content: 'https://cumberland-cloud.com/assets/imgs/cloud_tunnel.jpg',
      },
      {
        property: 'twitter:image:alt',
        content: "Learn about Cumberland Cloud's design process",
      },
      {
        property: 'twitter:card',
        content: 'summary',
      },
    ],
  },
  {
    path: '/pricing',
    nav_title: 'Pricing',
    nav_id: 'pricing-nav',
    page_title: 'The Cumberland Cloud - Pricing',
    page_description:
      'Find out how much your next project with the Cumberland Cloud will cost. Input your project details into our Project Cost Calculator to get an instant estimate.',
    menu: true,
    data: {},
    meta: [
      {
        property: 'og:url',
        content: 'https://cumberland-cloud.com/pricing',
      },
      {
        property: 'og:image',
        content: 'http://cumberland-cloud.com/assets/imgs/calculator.png',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://cumberland-cloud.com/assets/imgs/calculator.png',
      },
      {
        property: 'og:image:width',
        content: '1380',
      },
      {
        property: 'og:image:height',
        content: '1380',
      },
      {
        property: 'og:image:alt',
        content:
          'Estimate the cost of your next project with the Cumberland Cloud',
      },
      {
        property: 'twitter:image',
        content: 'https://cumberland-cloud.com/assets/imgs/calculator.png',
      },
      {
        property: 'twitter:image:alt',
        content:
          'Estimate the cost of your next project with the Cumberland Cloud',
      },
      {
        property: 'twitter:card',
        content: 'summary',
      },
    ],
  },
  {
    path: '/contact',
    nav_title: 'Contact',
    nav_id: 'contact-nav',
    page_title: 'The Cumberland Cloud - Contact',
    page_description:
      'Submit a form message with details about your next web development project to the Cumberland Cloud',
    menu: true,
    data: {},
    meta: [
      {
        property: 'og:url',
        content: 'https://cumberland-cloud.com/contact',
      },
      {
        property: 'og:image',
        content: 'http://cumberland-cloud.com/assets/imgs/message.png',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://cumberland-cloud.com/assets/imgs/message.png',
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
        content: 'Contact the Cumberland Cloud about your next project',
      },
      {
        property: 'twitter:image',
        content: 'https://cumberland-cloud.com/assets/imgs/message.png',
      },
      {
        property: 'twitter:image:alt',
        content: 'Contact the Cumberland Cloud about your next project',
      },
      {
        property: 'twitter:card',
        content: 'summary',
      },
    ],
  },
];

export const ASSET_CONFIG: ImgConfig[] = [
  {
    src: '/assets/imgs/money-banner.jpg',
    alt: 'Money, Money, Money',
    title: 'Some Money',
    id: 'money-banner',
  },
  {
    src: '/assets/imgs/circuitry-banner.jpg',
    alt: 'Cloud Computing',
    title: 'Cumberland Cloud Computing Services',
    id: 'cloud-computing-banner',
  },
  {
    src: '/assets/imgs/expertise-banner.jpg',
    alt: 'Expert Services',
    title: 'Cumberland Cloud Expertise',
    id: 'expertise-banner',
  },
  {
    src: '/assets/imgs/human_centric_design-banner.jpg',
    alt: 'Human Centered Design',
    title: 'Cumberland Cloud Design Principles',
    id: 'hcd-design-banner',
  },
  {
    src: '/assets/imgs/separated.jpg',
    alt: 'Standing Apart',
    title: 'Cumberland Cloud Uniqueness',
    id: 'separate-banner',
  },
  {
    src: '/assets/imgs/cloud_tunnel.jpg',
    alt: 'Cloud Tunnel',
    title: 'A Tunnel to the Clouds',
    id: 'cloud-tunnel-img',
  },
  {
    src: '/assets/people/grant/profile.jpg',
    alt: 'Grant Moore',
    title: "Grant Moore's Chiseled Jawline",
    id: 'grant-profile-pic',
  },
  {
    src: '/assets/svgs/rain-droplet.svg',
    alt: 'Rain',
    title: 'A drop of rain',
    id: 'svg-rain-graphic',
  },
  {
    src: '/assets/svgs/grass.svg',
    alt: 'Grass',
    title: 'Blade of Grass',
    id: 'svg-grass-graphic',
  },
  {
    src: '/assets/svgs/flower.svg',
    alt: 'Flower',
    title: 'A pretty flower',
    id: 'svg-flower-graphic',
  },
  {
    src: '/assets/svgs/deliver.svg',
    alt: 'Deliver',
    title: 'Cumberland Cloud - Deliver',
    id: 'svg-deliver-graphic',
  },
  {
    src: '/assets/svgs/deploy.svg',
    alt: 'Deploy',
    title: 'Cumberland Cloud - Deploy',
    id: 'svg-deploy-graphic',
  },
  {
    src: '/assets/svgs/develop.svg',
    alt: 'Develop',
    title: 'Cumberland Cloud - Develop',
    id: 'svg-develop-graphic',
  },
  {
    src: '/assets/svgs/design.svg',
    alt: 'Design',
    title: 'Cumberland Cloud - Develop',
    id: 'svg-develop-graphic',
  },
  {
    src: '/assets/svgs/sun.svg',
    alt: 'Sun',
    title: 'A Shining Sun',
    id: 'svg-sun-graphic',
  },
  {
    src: '/assets/imgs/innolab.png',
    alt: 'Innovation Lab',
    title: 'A Shining Sun',
    id: 'svg-sun-graphic',
  },
];

export const TOOL_CHIPS: ChipConfig[] = [
  {
    tooltip: 'Adobe XD',
    href: 'https://www.adobe.com/products/xd.html',
    svgIcon: 'xd',
  },
  {
    tooltip: 'Inkscape',
    href: 'https://inkscape.org/',
    svgIcon: 'inkscape',
  },
  {
    tooltip: 'GNU Image Manipulation Program',
    href: 'https://www.gimp.org/',
    svgIcon: 'gimp',
  },
  {
    tooltip: 'Drawio',
    href: 'https://www.diagrams.net/',
    svgIcon: 'drawio',
  },
  {
    tooltip: 'Typescript',
    href: 'https://www.typescriptlang.org/',
    svgIcon: 'typescript',
  },
  {
    tooltip: 'Angular',
    href: 'https://angular.io/',
    svgIcon: 'angular',
  },
  {
    tooltip: 'Python',
    href: 'https://www.python.org/',
    svgIcon: 'python',
  },
  {
    tooltip: 'Django',
    href: 'https://www.djangoproject.com/',
    svgIcon: 'django',
  },
  {
    tooltip: 'Docker',
    href: 'https://www.docker.com/',
    svgIcon: 'docker',
  },
  {
    tooltip: 'CloudFront',
    href: 'https://aws.amazon.com/cloudfront/',
    svgIcon: 'cloudfront',
  },
  {
    tooltip: 'S3',
    href: 'https://aws.amazon.com/S3/',
    svgIcon: 's3',
  },
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
    src: '../assets/icons/aws-logo.svg',
    name: 'aws',
  },
  {
    src: '../assets/icons/aws-apigateway.svg',
    name: 'apigateway',
  },
  {
    src: '../assets/icons/angular.svg',
    name: 'angular',
  },
  {
    src: '../assets/icons/bash.svg',
    name: 'bash',
  },
  {
    src: '../assets/icons/calculator.svg',
    name: 'calculator',
  },
  {
    src: '../assets/icons/aws-cloudfront.svg',
    name: 'cloudfront',
  },
  {
    src: '../assets/icons/aws-cognito.svg',
    name: 'cognito',
  },
  {
    src: '../assets/icons/cloud.svg',
    name: 'cloud_alt',
  },
  {
    src: '../assets/icons/cloud-code.svg',
    name: 'cloud_code',
  },
  {
    src: '../assets/icons/cloud-computing_01.svg',
    name: 'cloud_compute',
  },
  {
    src: '../assets/icons/cloud-computing_02.svg',
    name: 'cloud_compute_alt',
  },
  {
    src: '../assets/icons/cloud-download.svg',
    name: 'cloud_download',
  },
  {
    src: '../assets/icons/cloud-outline.svg',
    name: 'cloud_outline',
  },
  {
    src: '../assets/icons/drawio.svg',
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
    src: '../assets/icons/docker-fill.svg',
    name: 'docker-fill'
  },
  {
    src: '../assets/icons/django.svg',
    name: 'django',
  },
  {
    src: '../assets/icons/floppy-disk.svg',
    name: 'floppy_disk',
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
    src: '../assets/icons/inkscape.svg',
    name: 'inkscape',
  },
  {
    src: '../assets/icons/lightbulb.svg',
    name: 'lightbulb',
  },
  {
    src: '../assets/icons/lightbulb-outline.svg',
    name: 'lightbulb_badge',
  },
  {
    src: '../assets/icons/linux.svg',
    name: 'linux',
  },
  {
    src: '../assets/icons/aws-lambda.svg',
    name: 'lambda',
  },
  {
    src: '../assets/icons/piechart.svg',
    name: 'piechart',
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
    src: '../assets/icons/sunny.svg',
    name: 'sunny_fill',
  },
  {
    src: '../assets/icons/sunny-outline.svg',
    name: 'sunny',
  },
  {
    src: '../assets/icons/typescript.svg',
    name: 'typescript',
  },
  {
    src: '../assets/icons/twitter.svg',
    name: 'twitter',
  },
  {
    src: '../assets/icons/adobe-xd.svg',
    name: 'xd',
  },
];

export const GALLERY_CONFIG: GalleryConfig[] = [
  {
    subtitle: 'Makpar Innovation Lab',
    id: 'innolab-gallery',
    subtitle_id: 'innolab-gallery-subtitle',
    tooltip: 'Makpar Innovation Lab Homepage',
    img: {
      src: '/assets/imgs/innolab.png',
      alt: 'Makpar Innovation Lab: Cutting Edge Technology',
      title: 'Makpar Innovation Lab',
      id: 'innolab-img'
    },
    link: {
      id: 'innolab-link',
      href: 'https://laboratory-dev.makpar-innovation.net',
    }
  },
  {
    subtitle: 'Buy@GSA',
    id: 'gsa-gallery',
    subtitle_id: 'gsa-gallery-subtitle',
    tooltip: 'Buy@GSA Homepage',
    img: {
      src: '/assets/imgs/gsa.png',
      alt: 'Buy@GSA: Search Vendors and Suppliers',
      title: 'Buy@GSA Homepage',
      id: 'gsa-img'
    },
    link: {
      id: 'gsa-link',
      href: 'https://buy.gsa.gov'
    }
  },
  {
    subtitle: 'Scrilla',
    id: 'scrilla-gallery',
    subtitle_id: 'scrilla-gallery-subtitle',
    tooltip: 'Scrilla Documentation Homepage',
    img: {
      src: '/assets/imgs/scrilla.png',
      alt: 'Scrilla: A Financial Analysis Application',
      title: 'Scrilla',
      id: 'scrilla-img'
    },
    link:{
      id: 'scrilla-link',
      href: 'https://chinchalinchin.github.io/scrilla/OVERVIEW.html',
    }
  },
];

export const EXPERIENCE_CONFIG: ExperienceConfig[] = [
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
        id: 'makpar-link',
        href: 'https://makpar.com',
        innerHTML: 'Makpar Corporation',
      },
      {
        id: 'makpar-innolab-link',
        href: 'https://laboratory-dev.makpar-innovation.net',
        innerHTML: 'Innovation Lab Dev Site',
      },
      {
        id: 'makpar-innolab-docs-link',
        href: 'https://documentation.makpar-innovation.net',
        innerHTML: 'Innovation Lab Documentation',
      },
      {
        id: 'makpar-comet-award-link',
        href: 'https://www.tripointsolutions.com/announcements/tripoint-solutions-select-as-a-new-supplier-for-comet',
        innerHTML: 'COMET Contract Award, 2022',
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
        id: 'buy-gsa-link',
        href: 'https://buy.gsa.gov',
        innerHTML: 'Buy@GSA',
      },
      {
        id: 'calc-gsa-link',
        href: 'https://calc.gsa.gov',
        innerHTML: 'CALC',
      },
      {
        id: 'sam-gsa-link',
        href: 'https://sam.gov',
        innerHTML: 'SAM',
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

export const CERTIFICATION_CONFIG: CertificationConfig[] = [
  {
    tab_id: 'aws-devops-tab',
    title: 'AWS DevOps Engineer Professional',
    img: {
      src: '/assets/certs/AWS_DEVOPS.png',
      alt: 'AWS DevOps Professional Certificate',
      title: 'Amazon Web Services DevOps Engineer Professional Certification',
      id: 'aws-devops-cert-img',
    },
  },
  {
    tab_id: 'aws-developer-tab',
    title: 'AWS Developer Associate',
    img: {
      src: '/assets/certs/AWS_DEVELOPER.png',
      alt: 'AWS Developer Associate Certificate',
      title: 'Amazon Web Services Developer Associate Certification',
      id: 'aws-developer-cert-img',
    },
  },
  {
    tab_id: 'mta-dba-tab',
    title: 'MTA Database Administration',
    img: {
      src: '/assets/certs/MTA_DATABASE.png',
      alt: 'MTA Database Administration Certificate',
      title:
        'Microsoft Technology Associate Database Administration Certification',
      id: 'mta-dba-img',
    },
  },
  {
    tab_id: 'mta-software-tab',
    title: 'MTA Software Development',
    img: {
      src: '/assets/certs/MTA_SOFTWARE.png',
      alt: 'MTA Software Development Certificate',
      title: 'Grant Moore, MTA Software Development',
      id: 'mta-software-img',
    },
  },
  {
    tab_id: 'mta-python-tab',
    title: 'MTA Python Programming',
    img: {
      src: '/assets/certs/MTA_PYTHON.png',
      alt: 'MTA Python Programming Certificate',
      title:
        'Microsoft Technology Associate Introduction to Python Programming Certification',
      id: 'mta-python-img',
    },
  },
  {
    tab_id: 'mta-java-tab',
    title: 'MTA Java Programming',
    img: {
      src: '/assets/certs/MTA_JAVA.png',
      alt: 'MTA Java Programming Certificate',
      title:
        'Microsoft Technology Associate Introduction to Java Programming Certification',
      id: 'mta-java-img',
    },
  },
];

export const CORE_PRICING_CONFIG: PricingConfig[] = [
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
        justification: 'Hosting',
        basis: 'Per GB transferred',
        href: 'https://aws.amazon.com/cloudfront/pricing/',
      },
    ],
    tooltip: 'Charges per page',
    ids: ['core-design-checkbox', 'core-design-tooltip'],
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
    tooltip: 'Charges based on size and how frequently accessed',
    ids: ['core-invent-checkbox', 'core-invent-tooltip'],
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
    tooltip: 'Charges based on complexity of transactions',
    ids: ['core-market-checkbox', 'core-market-tooltip'],
  },
  {
    key: 'FORM',
    name: 'Form Processing',
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
    tooltip: 'Charges based on size and structure of form',
    ids: ['core-form-checkbox', 'core-form-tooltip'],
  },
  {
    key: 'SCHEDULE',
    name: 'Notifications',
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
        justification: 'Email',
        basis: 'Per 1000 Emails',
        href: 'https://aws.amazon.com/ses/pricing/',
      },
    ],
    rate: 1000,
    tooltip: 'Charges based on implementation effort',
    ids: ['core-data-checkbox', 'core-data-tooltip'],
  },
];

export const ADDON_PRICING_CONFIG: PricingConfig[] = [
  {
    key: 'STORAGE',
    name: 'Data Management',
    parameter: {
      type: 'slider',
      label: 'Complexity of data',
      states: 3,
      state_descriptions: [
        'Your data is scalar, i.e. all values can be inputted into an Excel spreadsheet',
        'Your data includes images, videos and other forms of media.',
        'Your data is aggregated from multiple sources. Note, depending on the complexity and the desired outcome, this may require other services and extra effort.',
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
    rate: 2000,
    tooltip: 'Charges based on amount of data',
    ids: ['addon-storage-checkbox', 'addon-storage-tooltip'],
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
    ids: ['addon-sso-checkbox', 'addon-sso-tooltip'],
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
    ids: ['addon-email-checkbox', 'addon-email-tooltip'],
  },
];

export const ANALYTICS_PRICING_CONFIG: PricingConfig[] = [
  {
    key: 'SEO',
    name: 'Search Optimization',
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
    tooltip: 'Charges based on number of pages',
    ids: ['core-seo-checkbox', 'core-seo-tooltip'],
  },
  {
    key: 'DEMO',
    name: 'User Conversion',
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
    ids: ['core-demographics-checkbox', 'core-demographics-tooltip'],
  },
];

export const REASON_CONFIG: ContactConfig[] = [
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

export const PROFILE_CONFIG: ProfileConfig[] = [
  {
    name: 'Grant Moore',
    key: 'grant',
    src: '/assets/people/grant/profile.jpg',
    title: 'Grant Moore, Lead Engineer',
    arrow_tooltip: "Grant Moore's Resume",
    position: 'Solution Architect, Developer & Designer',
    blurbs: [
      'Grant Moore has been a web developer and engineer professionally for three years, although his interest in computer science and technology extends far back into his teenage years when he first began learning Java. His first program was a game engine written with Java2D ( <sub><sup>archived <a href="https://github.com/chinchalinchin/java-game-engine" target="_blank">here</a></sup></sub> ). Since that time, he has expanded his knowledge into numerous disciplines, such as UI/UX design, frontend development, software engineering, development operations, containerization and cloud computing.',
      'He acquired an extensive technical backgrond while studying physics and mathematics during his undergraduate and graduate education. During his enrollment at Frostburg State and Towson University, he applied technology to a broad array of problems, such as pricing financial derivatives with stochastic processes and Monte Carlo simulations, estimating statistical calculations efficiently with recursive algorithms and modelling physical phenomena with determinitic and non-deterministic finite automatons.',
      'Read on for more information about yours truly...',
    ],
    // NOTE: about template assumes the first three factoids are personas
    //        and second three are proficiencies, i.e. order matters.
    // NOTE: also, the ids here have styles associated with them, so they
    //        must be selected with care.
    factoids: [
      {
        id: 'mathematician-text',
        content: 'mathematician',
      },
      {
        id: 'technologist-text',
        content: 'technologist',
      },
      {
        id: 'educator-text',
        content: 'educator',
      },
      {
        id: 'architecture-text',
        content: 'cloud native architecture',
      },
      {
        id: 'development-text',
        content: 'test-driven development',
      },
      {
        id: 'design-text',
        content: 'website design',
      },
    ],
  },
];

export const SVG_CONFIG: any = {
  cloud: {
    path_1:
      'M430.751,223.448c0.067-1.356,0.204-2.693,0.204-4.066c0-44.942-36.433-81.374-81.374-81.374c-8.933,0-17.505,1.493-25.547,4.152c-23.713-32.081-61.696-52.976-104.653-52.976c-71.907,0-130.199,58.293-130.199,130.199c0,0.684,0.093,1.345,0.103,2.028c-46.478,9.387-81.477,50.446-81.477,99.691c0,56.178,45.54,101.718,101.718,101.718h292.949c56.178,0,101.718-45.541,101.718-101.718C504.192,274.746,473.155,235.709,430.751,223.448z',
    path_2:
      'M324.035,142.159c-23.713-32.081-61.696-52.976-104.653-52.976c-71.907,0-130.199,58.293-130.199,130.199c0,0.684,0.093,1.345,0.103,2.028c-46.479,9.387-81.478,50.446-81.478,99.691c0,56.178,45.54,101.718,101.718,101.718',
    path_3:
      'M402.474,430.626H109.526C49.133,430.626,0,381.493,0,321.101c0-49.761,33.878-93.29,81.437-105.875c2.202-74.185,63.237-133.851,137.945-133.851c22.248,0,43.489,5.158,63.134,15.332c17.069,8.839,32.332,21.374,44.434,36.445c7.431-1.961,15.02-2.952,22.633-2.952c48.652,0,88.331,39.16,89.168,87.616c20.006,7.049,37.887,20.002,50.827,36.932c14.67,19.193,22.424,42.137,22.424,66.352C512,381.493,462.867,430.626,402.474,430.626z M219.381,96.99c-67.487,0-122.392,54.904-122.392,122.392c0,0.174,0.02,0.345,0.031,0.515c0.033,0.459,0.062,0.918,0.07,1.385l0.107,6.495l-6.368,1.286c-43.582,8.803-75.215,47.51-75.215,92.039c0,51.782,42.128,93.91,93.91,93.91h292.949c51.782,0,93.91-42.128,93.91-93.91c0-20.759-6.645-40.424-19.215-56.87c-12.168-15.921-29.425-27.741-48.587-33.281l-5.93-1.716l0.3-6.165c0.025-0.514,0.059-1.024,0.094-1.537c0.052-0.777,0.102-1.511,0.102-2.15c0-40.565-33.001-73.567-73.567-73.567c-7.787,0-15.557,1.264-23.096,3.757l-5.369,1.776l-3.361-4.547C294.357,115.144,258.501,96.99,219.381,96.99z',
    path_4:
      'M151.219,193.408h-15.615c0-35.251,28.679-63.929,63.929-63.929v15.615C172.892,145.095,151.219,166.768,151.219,193.408z',
  },
  lure: {
    path_1:
      'M508,254c0,91.6-48.4,171.6-120.8,216.4c-9.6,6-20,11.6-30.4,16c-31.2,14-66,21.6-102.8,21.6s-71.2-7.6-102.4-21.6c-10.4-4.8-20.8-10-30.4-16C48.4,425.6,0,345.6,0,254C0,113.6,113.6,0,254,0S508,113.6,508,254z',
    path_2:
      'M408,213.6c3.6-5.6,5.6-12,5.6-19.2c0-20.4-16.4-36.8-36.8-36.8c-2,0-4,0-5.6,0.4c-7.6-30.8-35.6-54-68.8-54c-21.2,0-40,9.2-52.8,23.6C236,113.2,216.4,104,194.8,104c-41.6,0-75.2,33.6-75.2,75.2c0,10.8,2.4,21.2,6.8,30.8c-29.2,4-51.6,28.8-51.6,58.8c0,25.6,16.4,47.6,39.2,56c-0.4,14-20.4,49.2-41.2,59.6c0,0,50,19.2,96-28.4c10.8,10.8,25.6,17.2,42,17.2c18.4,0,35.2-8.4,46-21.6c10.8,13.2,27.6,21.6,46,21.6c30,0,54.8-22,58.8-50.8c8,3.6,16.4,6,26,6c32.8,0,59.6-26.8,59.6-59.6C446.4,243.6,430.4,222,408,213.6z',
    path_3:
      'M271.6,197.6c0,26.8-8,61.2-17.6,61.2c-10,0-17.6-34.4-17.6-61.2s8-35.6,17.6-35.6C264,162,271.6,170.8,271.6,197.6z',
  },
};
