"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var car_service_1 = require("../services/car.service");
var years_service_1 = require("../services/years.service");
var pager_1 = require("../models/pager");
var CarAppComponent = (function () {
    function CarAppComponent(carService, yearsService) {
        this.carService = carService;
        this.yearsService = yearsService;
        this.filterYear = null;
        this.cars = [];
        this.years = [];
    }
    CarAppComponent.prototype.ngOnInit = function () {
        this.title = 'Список машин';
        this.pager = new pager_1.Pager({ currentPage: 1 });
        this.getCars();
        this.getYears();
    };
    CarAppComponent.prototype.getCars = function () {
        var _this = this;
        this.carService.getCars(this.pager.currentPage, this.filterYear)
            .subscribe(function (response) { return _this.onGetCarsResult(response); }, function (error) { return _this.errorMessage = error; });
    };
    CarAppComponent.prototype.getYears = function () {
        var _this = this;
        this.yearsService.getYears()
            .subscribe(function (years) { return _this.years = years; }, function (error) { return _this.errorMessage = error; });
    };
    CarAppComponent.prototype.onGetCarsResult = function (response) {
        this.cars = response.cars;
        this.pager.pageCount = response.pager.pageCount;
        this.pager.totalCount = response.pager.totalCount;
        this.pager.perPage = response.pager.perPage;
        this.pager.currentPage = response.pager.currentPage;
    };
    CarAppComponent.prototype.onFilterYearChange = function (year) {
        this.filterYear = year >> 0;
        this.getCars();
    };
    CarAppComponent.prototype.onPageChange = function (offset) {
        this.pager.currentPage = Math.ceil(offset / this.pager.perPage) + 1;
        this.getCars();
    };
    return CarAppComponent;
}());
CarAppComponent = __decorate([
    core_1.Component({
        selector: 'car-app',
        templateUrl: './car-app.component.html',
        styleUrls: ['./car-app.component.css'],
        providers: [car_service_1.CarService, years_service_1.YearsService],
    })
], CarAppComponent);
exports.CarAppComponent = CarAppComponent;
