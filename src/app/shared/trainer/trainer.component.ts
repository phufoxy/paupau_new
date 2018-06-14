import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ROUTES } from './trainers-data';
declare var $:any;
import { Router } from '@angular/router';

@Component({
    selector: 'main-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class TrainerComponent implements OnInit {
    @Input() trainer: any;
    @Output() trainerClicked: EventEmitter<any> = new EventEmitter<any>();

    constructor(public router: Router,public ref: ChangeDetectorRef) { }

    ngOnInit() {
        // setInterval(() => {
        //     this.ref.markForCheck();
        // }, 1000);
    }

    onTrainerClicked($event, trainerId) {
        this.trainerClicked.emit(trainerId);
        // console.log('trainer id: ', trainerId);
        
    }
}
