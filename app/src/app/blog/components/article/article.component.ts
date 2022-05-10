import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('linkedIn') public sharePanel!: ElementRef;

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
    console.log(this.sharePanel);
    let scriptEl = document.createElement('script');
    scriptEl.src = 'https://platform.twitter.com/widgets.js';
    scriptEl.type = 'text/javascript';
    this._renderer.appendChild(this._el.nativeElement, scriptEl);

    scriptEl = document.createElement('script');
    scriptEl.src = 'https://platform.linkedin.com/in.js';
    scriptEl.type = 'text/javascript';
    scriptEl.innerText = 'lang: en_US';
    this._renderer.appendChild(this._el.nativeElement, scriptEl);

    scriptEl = document.createElement('script');
    scriptEl.setAttribute('data-url', 'https://www.linkedin.com');
    scriptEl.type = 'IN/Share';
    this._renderer.appendChild(this.sharePanel.nativeElement, scriptEl);
  }

  scrollTo(el: string) {
    document.getElementById(el)?.scrollIntoView();
  }
}
