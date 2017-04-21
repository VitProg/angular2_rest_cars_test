
export class Pager {
    pageCount: number;
    totalCount: number;
    perPage: number;
    currentPage: number;

    constructor( values: Object = {} )
    {
        Object.assign( this, values );
    }

    get offset() {
        return Math.max(0, this.currentPage * this.perPage - this.perPage);
    }

}
