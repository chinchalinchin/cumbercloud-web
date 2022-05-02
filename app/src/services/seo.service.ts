import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private _title: Title,
    private _meta: Meta,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  public setStaticAtrributes() {
    this._meta.addTag({
      property: 'og:site_name',
      content: 'Cumberland Cloud',
    });
    this._meta.addTag({ property: 'og:type', content: 'website' });
    this._meta.addTag({
      property: 'twitter:site',
      content: '@CloudCumberland',
    });
  }

  public updateTitle(title: string) {
    this._title.setTitle(title);
    this._meta.updateTag({ property: 'og:title', content: title });
    this._meta.updateTag({ property: 'twitter:title', content: title });
  }

  public updateDescription(desc: string) {
    this._meta.updateTag({ name: 'description', content: desc });
    this._meta.updateTag({ property: 'og:description', content: desc });
    this._meta.updateTag({ property: 'twitter:description', content: desc });
  }

  public updateMetaAttributes(attrs: MetaConfig[] | undefined) {
    attrs?.forEach((attr: MetaConfig) => {
      this._meta.updateTag({ property: attr.property, content: attr.content });
    });
  }

  /**
   * Set JSON-LD Microdata on the Document Body.
   *
   * @param renderer2             The Angular Renderer
   * @param data                  The data for the JSON-LD script
   * @returns                     Void
   */
  public setJsonLd(renderer2: Renderer2, data: any): void {
    if (Object.keys(data).length) {
      let script = renderer2.createElement('script');
      script.type = 'application/ld+json';
      script.text = `${JSON.stringify(data)}`;
      renderer2.appendChild(this._document.body, script);
    }
  }
}
