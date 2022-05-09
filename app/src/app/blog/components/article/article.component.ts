import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
  public facebookShareUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _articles: ArticleService,
    private _el: ElementRef,
    private _renderer: Renderer2
  ) {
    let route_param: string | null = this._route.snapshot.paramMap.get('name');
    this.article = this._articles.getById(route_param);
    let url = encodeURI(
      `https://cumberland-cloud.com/blog/article/${this.article.id}`
    );
    this.facebookShareUrl = `https://www.facebook.com/plugins/share_button.php?href=${url}&layout=button&size=small&width=67&height=20&appId`;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    let scriptEl = document.createElement('script');
    scriptEl.src = 'https://platform.twitter.com/widgets.js';
    this._renderer.appendChild(this._el.nativeElement, scriptEl);
  }

  scrollTo(el: string) {
    document.getElementById(el)?.scrollIntoView();
  }
}
