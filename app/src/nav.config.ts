export interface NavConfig {
  path: string;
  nav_id?: string;
  nav_title?: string;
  page_title?: string;
  page_description?: string;
  group?: string;
  menu?: boolean;
  data?: any;
  children?: NavConfig[];
  meta?: MetaConfig[];
}

export interface MetaConfig {
  property: string;
  content: string;
}

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
        logo: 'https://cumberland-cloud.com/assets/svgs/icons/cloud-03.svg',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        image: [
          'https://cumberland-cloud.com/assets/imgs/banners/circuitry-banner.jpg',
          'https://cumberland-cloud.com/assets/imgs/banners/expertise-banner.jpg',
          'https://cumberland-cloud.com/assets/imgs/banners/human_centric_design-banner.jpg',
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
        content: 'http://cumberland-cloud.com/assets/imgs/covers/logo.png',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://cumberland-cloud.com/assets/imgs/covers/logo.png',
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
        content: 'https://cumberland-cloud.com/assets/imgs/covers/logo.png',
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
  {
    path: '/blog/article/angular_on_aws',
    page_title: 'The Cumberland Cloud - Angular on AWS',
    page_description:
      'In this article we explain how to setup a cloud environment to run an Angular single page application. We use a S3 Cloudfront distribution to host a static website. We go over the CloudFormation template to provision the entire stack.',
    menu: false,
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
        path: '/about/design',
        nav_title: 'Design',
        group: 'Process'
      },
      {
        path: '/about/grant',
        nav_title: 'Grant Moore',
        group: 'Team'
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
        content:
          'http://cumberland-cloud.com/assets/imgs/people/grant/profile.jpg',
      },
      {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        property: 'og:image:secure_url',
        content:
          'https://cumberland-cloud.com/assets/imgs/people/grant/profile.jpg',
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
        content:
          'https://cumberland-cloud.com/assets/imgs/people/grant/profile.jpg',
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
          'http://cumberland-cloud.com/assets/imgs/people/grant/americorps.jpg',
      },
      {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        property: 'og:image:secure_url',
        content:
          'https://cumberland-cloud.com/assets/imgs/people/grant/americorps.jpg',
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
          'https://cumberland-cloud.com/assets/imgs/people/grant/americorps.jpg',
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
    path: '/about/design',
    nav_title: 'Design',
    nav_id: 'design-nav',
    page_title: 'The Cumberland Cloud - Design',
    page_description:
      'The Cumberland Cloud has at your disposal years of production-grade software engineering experience. We take pride in our professionalism and as a result, our design process stands out from the rest of the crowd',
    menu: false,
    data: {},
    meta: [
      {
        property: 'og:url',
        content: 'https://cumberland-cloud.com/design',
      },
      {
        property: 'og:image',
        content:
          'http://cumberland-cloud.com/assets/imgs/banners/cloud_tunnel.jpg',
      },
      {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        property: 'og:image:secure_url',
        content:
          'https://cumberland-cloud.com/assets/imgs/banners/cloud_tunnel.jpg',
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
        content:
          'https://cumberland-cloud.com/assets/imgs/banners/cloud_tunnel.jpg',
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
        content:
          'http://cumberland-cloud.com/assets/imgs/covers/calculator.png',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'og:image:secure_url',
        content:
          'https://cumberland-cloud.com/assets/imgs/covers/calculator.png',
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
        content:
          'https://cumberland-cloud.com/assets/imgs/covers/calculator.png',
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
        content: 'http://cumberland-cloud.com/assets/imgs/covers/message.png',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://cumberland-cloud.com/assets/imgs/covers/message.png',
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
        content: 'https://cumberland-cloud.com/assets/imgs/covers/message.png',
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
