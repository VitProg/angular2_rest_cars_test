"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../environments/environment");
var pager_1 = require("../models/pager");
var cars_response_1 = require("../responses/cars.response");
var CarService = (function () {
    function CarService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        // this.headers.append('Content-Type', 'application/json');
        // this.headers.append('Accept', 'application/json');
    }
    CarService.prototype.getCars = function (page, year) {
        if (page === void 0) { page = 1; }
        if (year === void 0) { year = null; }
        var params = [];
        params['page'] = page;
        if (year) {
            params['year'] = year;
        }
        return this.http
            .get(environment_1.environment.restApi, {
            search: params,
        })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CarService.prototype.extractData = function (res) {
        var pager = new pager_1.Pager({
            pageCount: parseInt(res.headers.get('x-pagination-page-count')),
            totalCount: parseInt(res.headers.get('x-pagination-total-count')),
            perPage: parseInt(res.headers.get('x-pagination-per-page')),
            currentPage: parseInt(res.headers.get('x-pagination-current-page')),
        });
        var cars = res.json();
        return new cars_response_1.CarsResponse({
            cars: cars,
            pager: pager,
        });
    };
    CarService.prototype.handleError = function (error) {
        // debugger
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return rxjs_1.Observable.throw(errMsg);
    };
    return CarService;
}());
CarService = __decorate([
    core_1.Injectable()
], CarService);
exports.CarService = CarService;
