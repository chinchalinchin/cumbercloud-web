import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse, ArticleConfig } from 'src/models';

const FEED_SIZE = 2;
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public articles!: Observable<ApiResponse[]>;

  constructor(private _http: HttpClient) {
    this.articles = this._http.get<ApiResponse[]>(`${environment.apiUrl}/blog/articles`);
  }

  public getLatest(): Observable<ApiResponse> {
    return this.articles.pipe(
      map((data: ApiResponse[])=>{
        return data.sort(
          (previous, next) => next.date.getTime() - previous.date.getTime()
        )[0]
      })
    );
  }

  public getSampleFeed(): Observable<ApiResponse[]> {
    return this.articles.pipe(
      map((data: ApiResponse[])=>{
        if (data.length > FEED_SIZE - 1)
          return data.slice(1, FEED_SIZE + 1);
        return data;
      })
    );
  }

  public getFeed(): Observable<ApiResponse[]> {
    return this.articles;
  }

  public getById(id: string | null | undefined): Observable<ApiResponse> {
    return this.articles.pipe(
      map((data: ApiResponse[])=>{
        let found = data.find((article:ApiResponse)=> article.id === id)
        if(found) return found;
        else return data.sort(
          (previous, next) => next.date.getTime() - previous.date.getTime()
        )[0]
      })
    )
  };
}
