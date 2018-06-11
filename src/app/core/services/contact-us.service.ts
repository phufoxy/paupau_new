import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ContactUsService {

    public url: string = 'https://nameless-beyond-97489.herokuapp.com/api/';
    headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(public http: Http) { }

    postContact(data: any) {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.post(this.url + 'contact', data, options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
