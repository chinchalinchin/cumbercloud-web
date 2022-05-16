import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiListResponse, ApiResponse, ArticleConfig } from 'src/models';

const FEED_SIZE = 2;
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public articles!: ApiResponse[];

  constructor(private _http: HttpClient) {
    this._http.get<ApiListResponse>(`${environment.apiUrl}/articles`).subscribe((data: ApiListResponse)=>{
      this.articles = data.response;
    });
  }

  public sortByDate(): ApiResponse[] {
    return this.articles.sort(
      (previous, next) => next.date.getTime() - previous.date.getTime()
    );
  }

  public getLatest(): ApiResponse {
    return this.sortByDate()[0];
  }

  public getSampleFeed(): ApiResponse[] {
    if (this.articles.length > FEED_SIZE - 1)
      return this.articles.slice(1, FEED_SIZE + 1);
    return this.articles;
  }

  public getById(id: string | null | undefined): ApiResponse {
    let found = this.articles.find(
      (article: ApiResponse) => article.id === id
    );
    if (found) return found;
    return this.getLatest();
  }
}
