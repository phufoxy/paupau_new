import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'trainer-detail',
    templateUrl: './trainer-detail.component.html',
    styleUrls: ['./trainer-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerDetailComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute) {
        let params: any = this.activatedRoute.snapshot.params;
        // console.log('trainer id: ', params.id);
    }

    ngOnInit() {
    }

}
