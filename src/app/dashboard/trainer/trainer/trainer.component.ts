import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from '../../core/model/trainer';
import { Router } from '@angular/router';
import { TrainerService } from '../../core/service/trainer.service';
@Component({
    selector: 'trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerComponent implements OnInit {
    public base64textString: String = '';

    public trainer: Trainer;
    // tslint:disable-next-line:variable-name
    public base64textString_update: String = '';
    photos: Object;
    constructor(
        public router: Router,
        public trainerService: TrainerService) { }

    ngOnInit() {
        this.trainer = this.trainerService.getter();
    }

    processForm() {
        this.trainer.idCategory = 1;
        this.trainer.image = this.base64textString;
        if (this.trainer.idTrainer == undefined) {
            this.trainerService.createTrainer(this.trainer).subscribe((trainer) => {
                alert('Thêm Thành Công Giáo Viên ' + this.trainer.lastName + ' !');
                this.router.navigate(['/trainer-dashboard-detail']);
                this.clear();
            }, (error) => {
                console.log(error);
            });
        } else {
            this.trainerService.updateTrainer(this.trainer).subscribe((trainer) => {
                alert('Sửa Thành Công Giáo Viên ' + this.trainer.lastName + ' !');
                this.router.navigate(['/trainer-dashboard-detail']);
                this.clear();
            }, (error) => {
                console.log(error);
            });
        }

    }
    handleFileSelect(evt) {
        // tslint:disable-next-line:prefer-const
        let files = evt.target.files;
        const file = files[0];
        console.log(files);
        if (files && file) {
            const reader = new FileReader();

            reader.onload = this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }
    _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
    }

    // clear input
    clear() {
        this.trainer.idTrainer = null;
        this.trainer.lastName = '';
        this.trainer.firstName = '';
        this.trainer.birthday = '';
        this.trainer.phone = '';
        this.trainer.address = '';
        this.trainer.image = '';
        this.trainer.joined = '';
        this.trainer.status = '';
        this.trainer.description = '';
    }

}
