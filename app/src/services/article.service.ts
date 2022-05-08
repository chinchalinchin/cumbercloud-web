import { Injectable } from '@angular/core';
import { ArticleConfig, ARTICLE_CONFIG } from 'src/app/blog/blog.config';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  // TODO: initialize through API call
  public articles: ArticleConfig[] = ARTICLE_CONFIG;

  constructor() {}

  public sortByDate(): ArticleConfig[] {
    return this.articles.sort(
      (previous, next) => next.date.getTime() - previous.date.getTime()
    );
  }

  public getLatest(): ArticleConfig {
    return this.sortByDate()[0];
  }

  public getSampleFeed(): ArticleConfig[] {
    if (this.articles.length > 2) return this.articles.slice(1, 3);
    return this.articles;
  }

  public getById(id: string | null | undefined): ArticleConfig {
    let found = this.articles.find(
      (article: ArticleConfig) => article.id === id
    );
    if (found) return found;
    return this.getLatest();
  }
}
