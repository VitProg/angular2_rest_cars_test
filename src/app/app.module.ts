import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './components/app.component';
import {CarAppComponent} from './car-app/car-app.component';
import {PaginationComponent} from "./shared/pagination.component";

@NgModule({
    declarations: [
        AppComponent,
        CarAppComponent,
        PaginationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
