import {Component, OnInit} from '@angular/core';
import {CarService} from "../services/car.service";
import {Car} from "../models/car";
import {YearsService} from "../services/years.service";
import {CarsResponse} from "../responses/cars.response";
import {Pager} from "../models/pager";

@Component({
    selector: 'car-app',
    templateUrl: './car-app.component.html',
    styleUrls: ['./car-app.component.css'],
    providers: [CarService, YearsService],
})
export class CarAppComponent implements OnInit {
    filterYear: number = null;

    pager: Pager;
    // page: number = 0;
    // perPage: 20;

    errorMessage: string;
    cars: Car[] = [];
    years: number[] = [];

    title: string;
    loading: boolean;
    opacity: number;


    constructor(private carService: CarService, private yearsService: YearsService) {
    }

    ngOnInit() {
        this.title = 'Список машин';
        this.pager = new Pager({currentPage: 1});
        this.opacity = 0.5;
        this.getCars();
        this.getYears();
    }

    getCars() {
        this.loading = true;
        this.opacity = 0.5;
        this.carService.getCars(this.pager.currentPage, this.filterYear)
            .subscribe(
                response => this.onGetCarsResult(response),
                (error) => {this.errorMessage = <any>error; this.loading = false; this.opacity = 1;}
            );
    }

    getYears() {
        this.yearsService.getYears()
            .subscribe(
                years => this.years = years,
                error => this.errorMessage = <any>error
            );
    }

    onGetCarsResult(response: CarsResponse) {
        this.cars = response.cars;
        this.pager.pageCount = response.pager.pageCount;
        this.pager.totalCount = response.pager.totalCount;
        this.pager.perPage = response.pager.perPage;
        this.pager.currentPage = response.pager.currentPage;
        this.loading = false;
        this.opacity = 1;
    }

    onFilterYearChange(year: number) {
        this.filterYear = year >> 0;
        this.getCars();
    }

    onPageChange(offset: number) {
        this.pager.currentPage = Math.ceil(offset / this.pager.perPage) + 1;
        this.getCars();
    }
}
