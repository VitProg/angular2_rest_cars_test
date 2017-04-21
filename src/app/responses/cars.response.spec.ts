import {CarsResponse} from './cars.response';
import {Car} from "../models/car";
import {Pager} from "../models/pager";

describe('CarsResponse', () => {

    it('должно создать экзепляр класса', () => {
        expect(new CarsResponse()).toBeTruthy();
    });


    it('должно принять значения в конструктор', () => {
        let response = new CarsResponse({
            cars: [new Car({'model' : 'test'})],
            pager: new Pager({
                pageCount: 10,
                totalCount: 100,
                perPage: 10,
                currentPage: 1
            })
        });

        expect(response.cars.length).toEqual(1);
        expect(response.cars[0].model).toEqual('test');
        expect(response.pager.pageCount).toEqual(10);
        expect(response.pager.totalCount).toEqual(100);
        expect(response.pager.perPage).toEqual(10);
        expect(response.pager.currentPage).toEqual(1);
    });
});
