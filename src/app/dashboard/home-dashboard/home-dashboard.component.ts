import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Event } from '../core/model/event';
import { Router } from '@angular/router';
import { EventService } from '../core/service/event.service';
import { TrainerService } from '../core/service/trainer.service';
import { CourseService } from '../core/service/course.service';
import { NewsService } from '../core/service/news.service';
import { Location } from '@angular/common';

@Component({
    selector: 'home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: ['./home-dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDashboardComponent implements OnInit {
    public employeeRecord: any = [
        { name: 'jobf', city: 'sadsd' },
        { name: 'jobf1', city: 'sadsd' },
        { name: 'jobf2', city: 'sadsd' },
    ];
    public event: Event[];
    public events: Event;
    countTrainer: String;
    countCourse: String;
    coutNews: String;
    userName: String;
    limit: number;
    numberOfBooks: number;
    page: number = 1;
    filter: Event = new Event();
    pagesIndex = [];
    maxpage: number = 0;
    max: number = 0;
    constructor(public eventService: EventService, public _router: Router,    public location: Location,
        public ref: ChangeDetectorRef,
        public newsService: NewsService
        , public courseService: CourseService, public trainerService: TrainerService) { }
    ngOnInit() {

        this.init();
        this.getCount();
        setInterval(() => {
            this.ref.markForCheck();
        }, 100);
    }
    // load
    load() {
        location.reload();
    }
    // getcount
    getCount() {
        this.trainerService.getCount().subscribe((data) => {
            this.countTrainer = data;
        }, (error) => {
            console.log(error);
        });
        this.courseService.getCount().subscribe((data) => {
            this.countCourse = data;
        }, (error) => {
            console.log(error);
        });
        this.newsService.getCount().subscribe((data) => {
            this.coutNews = data;
        }, (error) => {
            console.log(error);
        });
    }
    init() {
        this.eventService.getEvent().subscribe((data) => {
            this.event = data;
            this.numberOfBooks = this.event.length;
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
    updateEvent(event) {
        let answer = confirm('Bạn Muốn Sửa ?');
        if (answer) {
            this.eventService.setter(event);
            this._router.navigate(['event-dashboard']);
        } else {
            // some code
            console.log('end');
        }

    }
    // delete
    deleteEvent(event) {
        let answer = confirm('Bạn Muốn Xóa ?');
        if (answer) {
            this.eventService.deleteEvent(event.idEvent).subscribe((data) => {
                alert('Xóa Thành Công !');
                this.event.splice(this.event.indexOf(event), 1);
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
}
