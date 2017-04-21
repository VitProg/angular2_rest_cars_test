import {Pager} from './pager';

describe('Pager', () => {

    it('должно создать экзепляр класса', () => {
        expect(new Pager()).toBeTruthy();
    });


    it('должно принять значения в конструктор', () => {
        let pagerArr = {
            pageCount: 10,
            totalCount: 100,
            perPage: 10,
            currentPage: 1
        };

        let pager = new Pager(pagerArr);

        for (let key in pagerArr) {
            expect(pager[key]).toEqual(pagerArr[key]);
        }
    });
});
