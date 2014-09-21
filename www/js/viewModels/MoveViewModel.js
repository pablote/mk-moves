/*globals ko, _, ButtonViewModel */
var MoveViewModel = (function () {
    'use strict';
    var MoveViewModel = function (move, settings) {
        var self = this;
        this.name = move.name || '';
        this.damage = move.damage || '';
        this.buttons = ko.observableArray();
        this.hits = ko.observable(move.hits);
        this.position = move.position || '';

        this.formattedHits = ko.computed(function () {
            return 'Hits: ' + this.hits;
        }, this);

        this.formattedDamage = ko.computed(function () {
            return 'Damage: ' + this.damage;
        }, this);

        this.formattedPosition = ko.computed(function () {
            return 'Position: ' + this.position;
        }, this);

        _.each(move.buttons, function (button) {
            self.buttons.push(new ButtonViewModel(button, settings));
        });
    };

    return MoveViewModel;
}());
