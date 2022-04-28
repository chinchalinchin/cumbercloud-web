import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  public setStaticAtrributes(){
    this.meta.addTag({ property: 'og:image', 
                        content: `https://cumberland-cloud.com/assets/cumberland.jpg`})
    this.meta.addTag({ property:'og:site_name', content: 'Cumberland Cloud'})
  }

  public updateTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({property: 'og:title', content: title})
  }

  public updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
    this.meta.updateTag({ property: 'og:description', content: desc})
  }

  public updateOgAttributes(route: string){
    this.meta.updateTag({ property: 'og:url', content: `https://cumberland-cloud.com/${route}` })
    this.meta.updateTag( { property: 'og:type', content: 'website'});
  }
}
