/*globals window, DataService */
var PlayerBioViewModel = (function (DataService) {
    'use strict';
    var PlayerBioViewModel = function () {
        var self = this;
        self.playerId = window.routeParams.playerId;

        var dataService = new DataService();
        dataService.getPlayer(self.playerId, function (character) {
            self.character = character;
        });
    };

    PlayerBioViewModel.prototype.backToDetails = function () {
        window.location = '#/player-details/' + this.playerId;
    };

    return PlayerBioViewModel;
}(DataService));
