import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Feedback } from '../../core/model/feedback';
@Injectable()
export class FeedbackService {
    public baseUrl: string = 'https://nameless-beyond-97489.herokuapp.com/api';
    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headers });
    public feedback = new Feedback();
    public token: string;
    constructor(public _http: Http) {
        this.token = localStorage.getItem('token');
    }
    // getdata
    getFeedback() {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });
        // getdata
        return this._http.get('https://nameless-beyond-97489.herokuapp.com/api/feedback', options).map((response: Response) => response.json());
    }
    // Add data
    createFeedback(feedback: Feedback) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // create
        return this._http.post('https://nameless-beyond-97489.herokuapp.com/api/feedback/new', JSON.stringify(feedback), options).map(this.extractData).catch(this.errorHandler);

    }
    // update data
    updateFeedback(feedback: Feedback) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // create
        return this._http.put('https://nameless-beyond-97489.herokuapp.com/api/feedback/update', JSON.stringify(feedback), options).map(this.extractData).catch(this.errorHandler);

    }
    // delete data
    deleteFeedback(id: Number) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });

        return this._http.delete('https://nameless-beyond-97489.herokuapp.com/api/feedback/delete/' + id, options).map(this.extractData).catch(this.errorHandler);
    }
    // set data
    setter(feedback: Feedback) {
        this.feedback = feedback;
    }
    // get data
    getter() {
        return this.feedback;
    }
    // Error
    errorHandler(error: Response) {
        return Observable.throw(error || 'SERVER ERROR');
    }
    public extractData(res: Response) {
        return res.text() ? res.json() : {};
    }
}
