import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Course } from '../../core/model/course';
import { Router } from '@angular/router';
import { CourseService } from '../../core/service/course.service';
@Component({
    selector: 'course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailComponent implements OnInit {
    public course: Course[];
    limit: number;
    numberOfBooks: number;
    page: number = 1;
    filter: Course = new Course();
    pagesIndex = [];
    maxpage: number = 0;
    max: number = 0;
    constructor(public courseService: CourseService, public _router: Router, public ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.init();
    }
    // delete
    deleteCourse(course) {
        let answer = confirm('Bạn Muốn Xóa Lớp ' + course.name + '?');
        if (answer) {
            // some code
            this.courseService.deleteCourse(course.idCourse).subscribe((data) => {
                this.course.splice(this.course.indexOf(course), 1);
                alert('Đã Xóa Lớp :' + course.name);
            }, (error) => {
                console.log(error);
            });
        } else {
            // some code
            console.log('end');
        }

    }
    // update
    updateCourse(course) {
        let answer = confirm('Bạn Muốn Sửa Lớp ' + course.name + '?');
        if (answer) {
            this.courseService.setter(course);
            this._router.navigate(['course-dashboard']);
        } else {
            // some code
            console.log('end');
        }


    }
    init() {
        this.courseService.getCourse().subscribe((course) => {
            this.course = course;
            this.numberOfBooks = this.course.length;
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
