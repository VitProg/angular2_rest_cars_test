import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Car} from '../models/car';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Pager} from "../models/pager";
import {CarsResponse} from "../responses/cars.response";

@Injectable()
export class CarService {
    private headers: Headers;

    constructor(private http: Http)
    {
        this.headers = new Headers();
        // this.headers.append('Content-Type', 'application/json');
        // this.headers.append('Accept', 'application/json');

    }

    getCars(page: number = 1, year: number = null): Observable<CarsResponse> {
        let params = [];
        params['page'] = page;
        if (year) {
            params['year'] = year;
        }

        return this.http
            .get(environment.restApi, {
                search: params,
                //headers: this.headers,
                // withCredentials: true,
            })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) : CarsResponse {
        let pager = new Pager({
            pageCount: parseInt(res.headers.get('x-pagination-page-count')),
            totalCount: parseInt(res.headers.get('x-pagination-total-count')),
            perPage: parseInt(res.headers.get('x-pagination-per-page')),
            currentPage: parseInt(res.headers.get('x-pagination-current-page')),
        });

        let cars = res.json();

        return new CarsResponse({
            cars: cars,
            pager: pager,
        });
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
