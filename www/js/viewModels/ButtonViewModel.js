/*globals ko */
var ButtonViewModel = (function () {
    'use strict';
    var ButtonViewModel = function (code, settings) {
        this.code = ko.observable(code);
        this.imageSrc = ko.observable('');
        this.imageWidth = ko.observable(0);
        this.imageHeight = ko.observable(0);
        this.text = ko.observable('');

        if (!settings.isLeft && code === 'b') {
            code = 'f';
        } else if (!settings.isLeft && code === 'f') {
            code = 'b';
        }

        var baseUrl;

        if (code.length === 1) {
            switch (code) {
            case '1':
            case '2':
            case '3':
            case '4':
                this.imageWidth(32);
                this.imageHeight(32);
                baseUrl = 'img/buttons/' + (settings.isXbox ? 'xbox' : 'ps') + '/';
                break;
            case 'u':
            case 'f':
            case 'b':
            case 'd':
                this.imageWidth(32);
                this.imageHeight(32);
                baseUrl = 'img/buttons/common/';
                break;
            case 'p':
                this.imageWidth(16);
                this.imageHeight(16);
                baseUrl = 'img/buttons/common/';
                break;
            case 'l':
                this.imageWidth(25);
                this.imageHeight(25);
                baseUrl = 'img/buttons/common/';
                break;
            case 't':
                this.imageWidth(68);
                this.imageHeight(20);
                baseUrl = 'img/buttons/common/';
                break;
            }

            this.imageSrc(baseUrl + code + '.png');
        } else {
            this.text(code);
        }

    };

    return ButtonViewModel;
}());
