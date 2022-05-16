import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import {
  AnimationControl,
  AnimationPeriods,
  Animations,
  AnimationTriggers,
} from 'src/animations';
import { ArticleService } from 'src/services/article.service';
import { MetaService } from 'src/services/meta.service';
import { ArticleConfig } from '../../blog.config';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  animations: [
    Animations.getManualEnlargeTrigger('1.5%', '30%', 'desktop'),
    Animations.getManualEnlargeTrigger('5%', '60%', 'mobile'),
    Animations.getFadeTrigger(null, AnimationPeriods.short)
  ]
})
export class ArticleComponent implements OnInit {
  public article: ArticleConfig;
  public facebookShareUrl: string;
  public highlighted: boolean = false;
  public expanded: boolean = false;
  public screenSize: string = '';
  public tocExpandCntl = new AnimationControl(AnimationTriggers.cntl_enlarge);

  @ViewChild('linkedIn') public sharePanel!: ElementRef;

  constructor(
    private _meta: MetaService,
    private _ga: GoogleAnalyticsService,
    private _route: ActivatedRoute,
    private _articles: ArticleService,
    private _el: ElementRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this._meta.mediaBreakpoint.subscribe((size: string) => {
      this.screenSize = size;
    });
    let route_param: string | null = this._route.snapshot.paramMap.get('name');
    this.article = this._articles.getById(route_param);
    let url = encodeURI(
      `https://cumberland-cloud.com/blog/article/${this.article.id}`
    );
    this.facebookShareUrl = `https://www.facebook.com/plugins/share_button.php?href=${url}&layout=button&size=small&width=67&height=20&appId`;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    let scriptEl = this._document.createElement('script');
    scriptEl.src = 'https://platform.twitter.com/widgets.js';
    scriptEl.type = 'text/javascript';
    this._renderer.appendChild(this._el.nativeElement, scriptEl);

    scriptEl = this._document.createElement('script');
    scriptEl.src = 'https://platform.linkedin.com/in.js';
    scriptEl.type = 'text/javascript';
    scriptEl.innerText = 'lang: en_US';
    this._renderer.appendChild(this._el.nativeElement, scriptEl);

    scriptEl = this._document.createElement('script');
    scriptEl.setAttribute('data-url', 'https://www.linkedin.com');
    scriptEl.type = 'IN/Share';
    this._renderer.appendChild(this.sharePanel.nativeElement, scriptEl);
  }

  scrollTo(el: string) {
    this._document.getElementById(el)?.scrollIntoView();
    this._ga.event(`article_scroll_${el}`)
  }

  public mobileMode() {
    return (
      this.screenSize === 'md' ||
      this.screenSize === 'sm' ||
      this.screenSize === 'xs'
    );
  }

  public toggleTocTree() {
    if (this.tocExpandCntl.fired()) {
      this.expanded = false;
      setTimeout(() => {
        this.tocExpandCntl.prime();
<<<<<<< HEAD
      }, AnimationPeriods.short*1000);
      this._ga.event('article_toc_toggle');
    }
    else{
=======
      }, AnimationPeriods.short * 1000);
    } else {
>>>>>>> 4b485597de44f5b96f1c5909a3044851493e7d34
      this.tocExpandCntl.animate();
      this.highlighted = false;
      setTimeout(() => {
        this.expanded = true;
<<<<<<< HEAD
      }, AnimationPeriods.short*1000);
      this._ga.event('article_toc_untoggle')
=======
      }, AnimationPeriods.short * 1000);
>>>>>>> 4b485597de44f5b96f1c5909a3044851493e7d34
    }
  }

  public highlight() {
    if (!this.tocExpandCntl.fired()) {
      this.highlighted = true;
    }
  }
}
