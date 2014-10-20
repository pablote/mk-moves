/*globals _, MoveViewModel*/
var MoveGroupViewModel = (function (MoveViewModel) {
    'use strict';
    var MoveGroupViewModel = function (itemGroup, settings) {
        var self = this;
        this.name = itemGroup.name;
        this.moves = [];

        _.each(itemGroup.items, function (item) {
            var moveViewModel = new MoveViewModel(item, settings);
            self.moves.push(moveViewModel);
        });
    };

    return MoveGroupViewModel;
}(MoveViewModel));
