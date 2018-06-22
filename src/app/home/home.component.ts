import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
import { ROUTESC } from './data/course-child-data';
import { ROUTESP } from './data/course-parent-data';
import { ROUTESF } from './data/focus-on-data';
import { ROUTES } from '../shared/trainer/trainers-data';
import { HomeService } from '../core/services/home.service';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [HomeService],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HomeComponent implements OnInit {
    parentcourse: any[];
    childcourses: any[];
    focusitems: any[];

    traineritems: any;


    @ViewChild('owlElement') owlElement: OwlCarousel
       fun() {
         this.owlElement.next([200])
         //duration 200ms
       }

    items: any[] = [
        { title: 'Try out the hanah sport center' },
    ];

    descriptions: any[] = [
        { title: 'with out 3-days all access pass with no commitment.' },
    ];

    constructor(public activatedRoute: ActivatedRoute, public router: Router, public home: HomeService, public ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.home.getParentCourse().subscribe(
            data => this.parentcourse = data.content
        );
        this.home.getChildCourse().subscribe(
            data => this.childcourses = data.content.splice(1, 3)
        );
        //    this.parentcourse = ROUTESP.filter(parentcourse => parentcourse);
        //    this.chilecourse = ROUTESC.filter(chilecourse => chilecourse);
        this.focusitems = ROUTESF.filter(focusitems => focusitems);
        //    this.traineritems = ROUTES.filter(traineritems => traineritems);
        this.home.getTopTrainer().subscribe(
            data => {this.traineritems = data.content
            console.log(data);}
        );

        this.fun();

        setInterval(() => {
            this.ref.markForCheck();
        }, 1000);

    }

    // onTrainerClicked(trainerId: number) {
    //     console.log('Clicked on button view profile!');
    //     this.router.navigate(['../trainer/', trainerId]);
    // }
    onTrainerClicked(trainerId: number) {
        console.log('Clicked on button view profile!');
        this.router.navigate(['../trainer/']);
    }
}
