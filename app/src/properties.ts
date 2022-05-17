export interface MetaConfig {
  property: string;
  content: string;
}

export interface ImgConfig {
  id: string;
  title: string;
  src: string;
  alt: string;
  style?: string;
  class?: string;
}

export interface LinkConfig {
  id: string;
  href: string;
  innerHTML?: string;
}
