import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';

@Component({
    selector: 'course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.css'],
    providers:[CourseService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailComponent implements OnInit {

    params:any;
    ngOnInit(): void {
        this.params = this.activatedRoute.snapshot.params;
        this.courseService.getCourse(this.params.id).subscribe(
            data=>{this.course=data
            // console.log(data);
            }
        );
        setInterval(() => {
            this.ref.markForCheck();
        }, 1000);
    }
    course: any ;
    
    start: string;
    
    stringSologan1: string="COURSE DETAIL";
    stringSologan2: string="Lorem Ipsum is simply dummy text of the printing and typesetting industry. ";

    constructor(public activatedRoute:ActivatedRoute,public courseService:CourseService,public ref: ChangeDetectorRef) {
        
    }

}
