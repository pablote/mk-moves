var PlayerViewModel = (function () {
    'use strict';
    var PlayerViewModel = function (player, selected) {
        this.id = player.id;
        this.name = player.name;
        this.smallImg = player.smallImg;
        this.selected = selected || false;
    };

    return PlayerViewModel;
}());
