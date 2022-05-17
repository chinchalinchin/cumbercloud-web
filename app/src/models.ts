import { ImgConfig, MetaConfig } from './properties';

export interface Preview {
  content: string;
  img: ImgConfig;
}

export interface TOC {
  id: string;
  title: string;
  children?: TOC[];
}

export interface Article {
  title: string;
  preview: Preview;
  data: string;
  src: string;
  tags: string[];
  toc_tree: TOC[];
}

export interface Nav {
  path: string;
  nav_id?: string;
  nav_title?: string;
  page_title?: string;
  page_description?: string;
  group?: string;
  menu?: boolean;
  data?: any;
  children?: Nav[];
  meta?: MetaConfig[];
}

export interface ApiResponse {
  id: string;
  date: Date;
  nav_config: Nav;
  article_config: Article;
  data: string;
}
