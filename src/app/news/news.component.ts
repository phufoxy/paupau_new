import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NewsService } from '../core/services/news.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers:[NewsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  constructor(public ref: ChangeDetectorRef,public newsService:NewsService) { 

  }
  listNews:any[];
  ngOnInit() {
    this.newsService.getTopNews().subscribe(
      data=>this.listNews=data.content
    );
    setInterval(() => {
      this.ref.markForCheck();
    }, 500);
  }

}
