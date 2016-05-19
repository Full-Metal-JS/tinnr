"use strict";
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <StackLayout>\n      <TextField \n        hint=\"Email Address\" \n        keyboardType=\"email\"\n        autocorrect=\"false\" \n        autocapitalizationType=\"none\">\n      </TextField>\n      <TextField \n        hint=\"Password\" \n        secure=\"true\">\n      </TextField>\n\n      <Button text=\"Sign in\"></Button>\n      <Button text=\"Sign up for Groceries\"></Button>\n    </StackLayout>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map