import {Car} from './car';

describe('Car', () => {

    it('должно создать экзепляр класса', () => {
        expect(new Car()).toBeTruthy();
    });


    it('должно принять значения в конструктор', () => {
        let carArr = {
            id: 1,
            brand: 'audi',
            model: 'a6',
            year: 2017,
            color: 'red',
            mileage: 10000,
            cost: 1000000
        };

        let car = new Car(carArr);

        for (let key in carArr) {
            expect(car[key]).toEqual(carArr[key]);
        }
    });
});
