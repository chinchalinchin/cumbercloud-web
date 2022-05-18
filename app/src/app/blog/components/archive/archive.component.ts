import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ApiResponse } from 'src/models';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {

  public articles!: ApiResponse[];

  constructor(
    private _articles: ArticleService,
    private _ga: GoogleAnalyticsService,
  ) {
    this._articles.getFeed().subscribe((data:ApiResponse[])=>{
      this.articles = data;
    })
  }

  ngOnInit(): void {}
}
