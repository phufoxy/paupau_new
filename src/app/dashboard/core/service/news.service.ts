import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { News } from '../../core/model/news';

@Injectable()
export class NewsService {
    private baseUrl: string = 'https://nameless-beyond-97489.herokuapp.com/api';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    private news = new News();
    public token: string;
    constructor(public _http: Http) {
        this.token = localStorage.getItem('token');
    }
    // getCount
    getCount() {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });
        // getdata
        return this._http.get(this.baseUrl + '/news/count', options).map((response: Response) => response.json());
    }
    // getdata
    getFeedback() {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });
        // getdata
        return this._http.get(this.baseUrl + '/news', options).map((response: Response) => response.json());
    }
    // Add data
    createFeedback(news: News) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // create
        return this._http.post(this.baseUrl + '/news/new', JSON.stringify(news), options).map(this.extractData).catch(this.errorHandler);

    }
    // update data
    updateFeedback(news: News) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // create
        return this._http.put(this.baseUrl + '/news/update', JSON.stringify(news), options).map(this.extractData).catch(this.errorHandler);

    }

    // delete data
    deleteNews(id: Number) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });

        return this._http.delete(this.baseUrl + '/news/delete/' + id, options).map(this.extractData).catch(this.errorHandler);
    }
    // set data
    setter(news: News) {
        this.news = news;
    }
    // get data
    getter() {
        return this.news;
    }
    // Error
    errorHandler(error: Response) {
        return Observable.throw(error || 'SERVER ERROR');
    }
    public extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

}
