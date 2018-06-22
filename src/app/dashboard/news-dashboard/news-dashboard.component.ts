import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { News } from '../core/model/news';
import { Router } from '@angular/router';
import { NewsService } from '../core/service/news.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'news-dashboard',
    templateUrl: './news-dashboard.component.html',
    styleUrls: ['./news-dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsDashboardComponent implements OnInit {
    public news: News[];
    public newss: News;
    limit: number;
    numberOfBooks: number;
    page: number = 1;
    filter: News = new News();
    pagesIndex = [];
    maxpage: number = 0;
    max: number = 0;
    public myDate = new Date();
    public _dateTimeLocal: Date;
    editorConfig = {
        editable: true,
        spellcheck: false,
        height: '10rem',
        minHeight: '5rem',
        placeholder: 'Nhập Dữ Liệu Vào <3..',
        translate: 'no'
    };

    htmlContent = '';
    constructor(public newsService: NewsService, public _router: Router
        , public location: Location, public datepipe: DatePipe, public ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.newss = this.newsService.getter();
        this.init();
    }
    // load
    load() {
        location.reload();
    }
    topFunction() {
        document.body.scrollTop = 200;
        document.documentElement.scrollTop = 200;
    }
    bottomFunction() {
        document.body.scrollTop = 1000;
        document.documentElement.scrollTop = 1000;
    }
    processForm() {
        this.newss.idCategory = 1;
        if (this.newss.idNews == undefined) {
            this.newss.createAt = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
            this.newsService.createFeedback(this.newss).subscribe((newss) => {
                alert('Thêm Thành Công !');
                this.init();
                this.load();
                this.clear();
            }, (error) => {
                console.log(error);
            });
        } else {
            this.newss.createAt = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
            this.newsService.updateFeedback(this.newss).subscribe((newss) => {
                alert('Sửa Thành Công !');
                this.init();
                this.load();
                this.clear();
            }, (error) => {
                console.log(error);
            });
        }
        this.bottomFunction();
    }
    // getdata
    init() {
        this.newsService.getFeedback().subscribe((data) => {
            this.news = data;
            this.numberOfBooks = this.news.length;
            this.limit = 6;
            if (this.numberOfBooks < this.limit) {
                this.maxpage = 1;
            } else if (this.numberOfBooks % 6 == 0) {
                this.maxpage = (this.numberOfBooks / 6);
            } else {
                this.maxpage = ((this.numberOfBooks % 6) / (this.numberOfBooks % 6)) + (this.numberOfBooks / 6);
            }
            // cover number
            this.max = Math.floor(this.maxpage);
            // push item page
            for (let i = 1; i <= this.max; i++) {
                this.pagesIndex.push(i);
            }
        }, (error) => {
            console.log(error);
        });
        setInterval(() => {
            this.ref.markForCheck();
        }, 100);
    }
    // update
    updateFeedback(news) {
        let answer = confirm('Bạn Muốn Sửa ?');
        if (answer) {
            this.newss.idNews = news.idNews;
            this.newss.title = news.title;
            this.newss.createAt = news.createAt;
            this.newss.description = news.description;
            this.newss.details = news.details;
            this.newss.idCategory = news.idCategory;
            this.newss.userName = news.userName;
        } else {
            // some code
            console.log('end');
        }

    }
    // delete
    deleteNews(news) {
        let answer = confirm('Bạn Muốn Xóa ?');
        if (answer) {
            this.newsService.deleteNews(news.idNews).subscribe((data) => {
                this.news.splice(this.news.indexOf(news), 1);
                alert('Sửa Thành Công !');
                this.load();
            }, (error) => {
                console.log(error);
            });
        } else {
            // some code
            console.log('end');
        }

    }
    // prevpage
    prevPage() {
        this.page--;
    }
    // nextpage
    nextPage() {
        this.page++;
    }
    // set page
    setPage(pagenumber: number) {
        this.page = pagenumber;
    }
    // clear input
    clear() {
        this.newss.idNews = null;
        this.newss.title = null;
        this.newss.createAt = null;
        this.newss.description = null;
        this.newss.details = null;
        this.newss.idCategory = null;
        this.newss.userName = null;

    }
}
