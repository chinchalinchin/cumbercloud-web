import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleConfig } from 'src/app/app.config';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  public article: ArticleConfig;

  constructor(
    private _route: ActivatedRoute,
    private _articles: ArticleService
  ) {
    let route_param: string | null = this._route.snapshot.paramMap.get('name');
    let route_id: number | null = route_param ? parseInt(route_param) : null;
    this.article = this._articles.getById(route_id);
    console.log(this.article);
  }

  ngOnInit(): void {}
}
