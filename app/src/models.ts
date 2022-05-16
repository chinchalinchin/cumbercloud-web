import { ImgConfig, MetaConfig } from "./properties";

export interface Preview {
    content: string;
    img: ImgConfig;
}

export interface TOCNode {
    id: string;
    title: string;
    children?: TOCNode[];
}

export interface ArticleConfig {
    title: string;
    preview: Preview;
    data: string;
    src: string;
    toc_tree: TOCNode[];
}

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

export interface ApiResponse{
    id: string;
    date: Date;
    nav_config: NavConfig;
    article_config: ArticleConfig;
    data: string;
}

export interface ApiListResponse{
    response: ApiResponse[]
}
  