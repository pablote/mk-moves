/*globals window */
var KombatKodesViewModel = (function () {
    'use strict';
    var KombatKodesViewModel = function () {
        var self = this,
            dataService = new DataService();

        dataService.getKombatKodes(function (getKombatKodesResponse) {
            self.kodes = getKombatKodesResponse;
        });
    };

    KombatKodesViewModel.prototype.backToMain = function () {
        window.location = '#/player-list';
    };

    return KombatKodesViewModel;
}());