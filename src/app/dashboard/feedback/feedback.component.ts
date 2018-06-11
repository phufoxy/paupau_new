import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Feedback } from '../core/model/feedback';
import { Router } from '@angular/router';
import { FeedbackService } from '../core/service/feedback.service';
import { Location } from '@angular/common';
@Component({
    selector: 'feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackComponent implements OnInit {
    public feedback: Feedback[];
    public feedbacks: Feedback;
    limit: number;
    numberOfBooks: number;
    page: number = 1;
    filter: Feedback = new Feedback();
    pagesIndex = [];
    maxpage: number = 0;
    max: number = 0;

    constructor(public feedbackService: FeedbackService,
        public _router: Router,
        public location: Location,
        public ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.feedbacks = this.feedbackService.getter();
        this.init();
    }
    load() {
        location.reload();
    }
    processForm() {
        this.feedbacks.image = 'https://www.materialui.co/materialIcons/action/feedback_black_192x192.png';
        if (this.feedbacks.idFeedback == undefined) {
            this.feedbackService.createFeedback(this.feedbacks).subscribe((feedbacks) => {
                alert('Thêm Thành Công !');
                this.init();
                this.load();
                this.clear();
            }, (error) => {
                console.log(error);
            });
        } else {
            this.feedbackService.updateFeedback(this.feedbacks).subscribe((feedbacks) => {
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
    topFunction() {
        document.body.scrollTop = 200;
        document.documentElement.scrollTop = 200;
    }
    bottomFunction() {
        document.body.scrollTop = 1000;
        document.documentElement.scrollTop = 1000;
    }
    // update
    updateFeedback(feedback) {
        let answer = confirm('Bạn Muốn Sửa ?');
        if (answer) {
            this.feedbacks.idFeedback = feedback.idFeedback;
            this.feedbacks.fullName = feedback.fullName;
            this.feedbacks.image = feedback.image;
            this.feedbacks.message = feedback.message;
        } else {
            // some code
            console.log('end');
        }
        // this.feedbackService.setter(feedback);

    }
    // getdata
    init() {
        this.feedbackService.getFeedback().subscribe((data) => {
            console.log(data);
            this.feedback = data;
            this.numberOfBooks = this.feedback.length;
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
    // delete
    deleteFeedback(feedback) {
        let answer = confirm('Bạn Muốn Xóa ?');
        if (answer) {
            this.feedbackService.deleteFeedback(feedback.idFeedback).subscribe((data) => {
                this.feedback.splice(this.feedback.indexOf(feedback), 1);
                alert('Xóa Thành Công :' + feedback.message);
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
        this.feedbacks.idFeedback = null;
        this.feedbacks.fullName = '';
        this.feedbacks.image = '';
        this.feedbacks.message = '';

    }
}
