import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/services/article.service';
import { ArticleConfig } from '../../blog.config';

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
    this.article = this._articles.getById(route_param);
    console.log(this.article);
  }

  ngOnInit(): void {}

  scrollTo(el: string) {
    document.getElementById(el)?.scrollIntoView();
  }
}
