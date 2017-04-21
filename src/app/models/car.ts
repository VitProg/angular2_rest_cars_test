
export class Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    mileage: number;
    cost: number;

    constructor( values: Object = {} )
    {
        Object.assign( this, values );
    }

}
