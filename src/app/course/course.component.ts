import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CourseService } from '../core/services/course.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    providers:[CourseService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {


    courses:any[];
    // =[
    //     { path: 'classic', title: 'CLASSIC', decription: 'Putting you in the spotlight ', img: 'dashboard', class: ''},
    //     { path: 'advance', title: 'ADVANCE', decription: 'Looking for the best friend',  img:'person', class: ''},
    //     { path: 'normal', title: 'NORMAL', decription: 'Reaching the right audience for you',  img:'content_paste', class: ''},
    //     { path: 'cro', title: 'CRO', decription: 'Increasing your courses performance',  img:'library_books', class: ''},
    //     { path: 'analythics', title: 'ANALYTHICS', decription: 'Aiming at the important numbers', img:'bubble_chart', class: ''},
    //     { path: 'master', title: 'MASTER', decription: 'Level maximum', img:'location_on', class: ''},
    //     { path: 'final', title: 'FINAL', decription: 'Final Courses', img:'notifications', class: ''},

    // ];
    reload: number;
    reload1: number;



    constructor(public router: Router, public location: Location,public coursez:CourseService,public ref: ChangeDetectorRef) {

    }
    ngOnInit(): void {
        this.courses=[];
        this.coursez.getAllCourse().subscribe(
            data => {
                this.courses=data,
                console.log(data)
            }
        );
        setInterval(() => {
            this.ref.markForCheck();
        }, 1000);
    }
    // ngOnInit() {
    //   setTimeout(() => this.start = true, 1000)
    // }
}
