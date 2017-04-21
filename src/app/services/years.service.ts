import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class YearsService {
    private headers: Headers;

    constructor(private http: Http)
    {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    getYears(): Observable<number[]> {
        return this.http.get(environment.restApi + '/years')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        // debugger
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        // debugger
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
