import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NewsService {
    private url: string = 'https://nameless-beyond-97489.herokuapp.com/api/';

    constructor(public http: Http) { }

    getTopNews() {
        return this.http.get(this.url + 'news/0/10')
            .map(response => response.json())
            .catch(this.handleError);
    }


    public handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
