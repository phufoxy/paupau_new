import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
@Injectable()
export class EventService {

    private url: string = 'https://nameless-beyond-97489.herokuapp.com/api/';

    constructor(public http: Http) { }

    getTopEvent() {
        return this.http.get(this.url + 'event/0/1')
            .map(response => response.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
