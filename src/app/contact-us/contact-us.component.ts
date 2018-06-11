import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactUsService } from '../core/services/contact-us.service';
import { stringify } from 'querystring';

@Component({
    selector: 'contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css'],
    providers:[ContactUsService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsComponent implements OnInit {

    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    email = new FormControl('', [Validators.required, Validators.email]);
    constructor(public _formBuilder: FormBuilder, public router: Router,public contactService:ContactUsService) { }
    err:any;
    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
          });
          this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
          });
    }
    postContact(data:NgForm){
        
        if(data.valid){
            // console.log(data.value);
            this.contactService.postContact(data.value).subscribe(
                data=>{
                    data=data
                },
                err=>this.err=err
            );
            this.err="send success";
        }else{
            this.err="please fill out the form";
        }
        
    }
    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }

}
