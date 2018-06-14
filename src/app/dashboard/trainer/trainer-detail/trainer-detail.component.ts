import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Trainer } from '../../core/model/trainer';
import { Router } from '@angular/router';
import { TrainerService } from '../../core/service/trainer.service';
@Component({
    selector: 'trainer-detail',
    templateUrl: './trainer-detail.component.html',
    styleUrls: ['./trainer-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerDetailComponent implements OnInit {

    public trainer: Trainer[];
    limit: number;
    numberOfBooks: number;
    page: number = 1;
    filter: Trainer = new Trainer();
    pagesIndex = [];
    maxpage: number = 0;
    max: number = 0;
    constructor(public trainerService: TrainerService, public _router: Router, public ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.init();

    }
    // delete
    deleteTrainer(trainer) {
        let answer = confirm('Bạn Muốn Xóa Giáo Viên ' + trainer.lastName + ' ?');
        if (answer) {
            this.trainerService.deleteTrainer(trainer.idTrainer).subscribe((data) => {
                alert('Xóa Thành Công Giáo Viên ' + trainer.lastName + '?');
                this.trainer.splice(this.trainer.indexOf(trainer), 1);
            }, (error) => {
                console.log(error);
            });
        } else {
            // some code

        }

    }
    // update
    updateTrainer(trainer) {
        let answer = confirm('Bạn Muốn Sửa Giáo Viên ' + trainer.lastName + ' ?');
        if (answer) {
            this.trainerService.setter(trainer);
            this._router.navigate(['trainer-dashboard']);
        } else {
            // some code
            console.log('end');
        }

    }
    // getdata
    init() {
        this.trainerService.getTrainer().subscribe((trainer) => {
            this.trainer = trainer;
            this.numberOfBooks = this.trainer.length;
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
