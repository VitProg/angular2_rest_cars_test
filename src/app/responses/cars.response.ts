
import {Car} from "../models/car";
import {Pager} from "../models/pager";

export class CarsResponse {
    pager: Pager;
    cars: Car[];

    constructor( values: Object = {} )
    {
        Object.assign( this, values );
    }

}
