import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from '../core/services/trainer.service';
export const ROUTES = [
    { path: '/trainer/Mane', name: 'Mane', position: 'CEO, Teacher', img: 'assets/img/trainner/trainner1.jpg', class: '' },
    { path: '/trainer/Salah', name: 'Salah', position: 'Founder', img: 'assets/img/trainner/trainner2.jpg', class: '' },
    { path: '/trainer/Firmino', name: 'Firmino', position: 'Teacher', img: 'assets/img/trainner/trainner3.jpg', class: '' },
    { path: '/trainer/Hendo', name: 'Hendo', position: 'Teacher', img: 'l../../', class: '' },
    { path: '/trainer/Chamberlain', name: 'Chamberlain', position: 'MASTER Teacher', img: '/../../', class: '' },

];

@Component({
    selector: 'trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.css'],
    providers: [TrainerService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerComponent implements OnInit {
    traineritems: any[];
    constructor(public router: Router, public trainerService: TrainerService, public ref: ChangeDetectorRef) { }
    // goToTrainer(){
    //     this.router.navigateByUrl('/trainer');
    //      location.reload()
    //  }
    ngOnInit() {
        this.trainerService.getAllTrainers().subscribe(
            data => { this.traineritems = data, console.log(this.traineritems); }
        );
        setInterval(() => {
            this.ref.markForCheck();
        }, 1000);
        // this.traineritems = ROUTES.filter(traineritems => traineritems);

    }

}
