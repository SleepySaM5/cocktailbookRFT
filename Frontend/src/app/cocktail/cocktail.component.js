"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CocktailComponent = /** @class */ (function () {
    function CocktailComponent() {
        this.myImgPath = 'assets/ginTonic.jpeg';
    }
    CocktailComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], CocktailComponent.prototype, "cocktail", void 0);
    CocktailComponent = __decorate([
        core_1.Component({
            selector: 'app-cocktail',
            templateUrl: './cocktail.component.html',
            styleUrls: ['./cocktail.component.scss']
        })
    ], CocktailComponent);
    return CocktailComponent;
}());
exports.CocktailComponent = CocktailComponent;
