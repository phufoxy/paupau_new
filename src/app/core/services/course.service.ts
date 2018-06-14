import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

@Injectable()
export class CourseService {

    private url: string = 'https://nameless-beyond-97489.herokuapp.com/api/';

    constructor(public http: Http) { }

    getAllCourse() {
        return this.http.get(this.url + 'course')
            .map(response => response.json())
            .catch(this.handleError);
    }
    getCourse(id: number) {
        return this.http.get(this.url + 'course/' + id)
            .map(response => response.json())
            .catch(this.handleError);
    }


    public handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
