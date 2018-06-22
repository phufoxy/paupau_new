import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Event } from '../model/event';

@Injectable()
export class EventService {
    private baseUrl: string = 'https://nameless-beyond-97489.herokuapp.com/api';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    private event = new Event();
    public token: string;
    constructor(public _http: Http) {
        this.token = localStorage.getItem('token');
    }
    // getdata
    getEvent() {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });
        // getdata
        return this._http.get(this.baseUrl + '/event', options).map((response: Response) => response.json());
    }
    // Add data
    createEvent(event: Event) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // create
        return this._http.post(this.baseUrl + '/event/new', JSON.stringify(event), options).map(this.extractData).catch(this.errorHandler);

    }
    // update data
    updateEvent(event: Event) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // create
        return this._http.put(this.baseUrl + '/event/update', JSON.stringify(event), options).map(this.extractData).catch(this.errorHandler);

    }
    // delete data
    deleteEvent(id: Number) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });

        return this._http.delete(this.baseUrl + '/event/delete/' + id, options).map(this.extractData).catch(this.errorHandler);
    }
    // set data
    setter(event: Event) {
        this.event = event;
    }
    // get data
    getter() {
        return this.event;
    }
    // Error
    errorHandler(error: Response) {
        return Observable.throw(error || 'SERVER ERROR');
    }
    public extractData(res: Response) {
        return res.text() ? res.json() : {};
    }
}
