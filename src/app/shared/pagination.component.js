"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.offset = 0;
        this.limit = 1;
        this.size = 1;
        this.range = 3;
        this.pageChange = new core_1.EventEmitter();
    }
    PaginationComponent.prototype.ngOnInit = function () {
        this.getPages(this.offset, this.limit, this.size);
    };
    PaginationComponent.prototype.ngOnChanges = function () {
        this.getPages(this.offset, this.limit, this.size);
    };
    PaginationComponent.prototype.getPages = function (offset, limit, size) {
        var _this = this;
        this.currentPage = this.getCurrentPage(offset, limit);
        this.totalPages = this.getTotalPages(limit, size);
        this.pages = rxjs_1.Observable.range(-this.range, this.range * 2 + 1)
            .map(function (offset) { return _this.currentPage + offset; })
            .filter(function (page) { return _this.isValidPageNumber(page, _this.totalPages); })
            .toArray();
    };
    PaginationComponent.prototype.isValidPageNumber = function (page, totalPages) {
        return page > 0 && page <= totalPages;
    };
    PaginationComponent.prototype.getCurrentPage = function (offset, limit) {
        return Math.floor(offset / limit) + 1;
    };
    PaginationComponent.prototype.getTotalPages = function (limit, size) {
        return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
    };
    PaginationComponent.prototype.selectPage = function (page, event) {
        this.cancelEvent(event);
        if (this.isValidPageNumber(page, this.totalPages)) {
            this.pageChange.emit((page - 1) * this.limit);
        }
    };
    PaginationComponent.prototype.cancelEvent = function (event) {
        event.preventDefault();
    };
    return PaginationComponent;
}());
__decorate([
    core_1.Input()
], PaginationComponent.prototype, "offset", void 0);
__decorate([
    core_1.Input()
], PaginationComponent.prototype, "limit", void 0);
__decorate([
    core_1.Input()
], PaginationComponent.prototype, "size", void 0);
__decorate([
    core_1.Input()
], PaginationComponent.prototype, "range", void 0);
__decorate([
    core_1.Output()
], PaginationComponent.prototype, "pageChange", void 0);
PaginationComponent = __decorate([
    core_1.Component({
        selector: 'app-pagination',
        templateUrl: './pagination.component.html'
    })
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
