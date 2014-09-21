/*globals window, DataService, UserSettings */
var PlayerListViewModel = (function (window, DataService, UserSettings) {
    'use strict';
    var PlayerListViewModel = function () {
        var self = this,
            dataService = new DataService(),
            userSettings = new UserSettings();

        userSettings.getConfig(function (settings) {
            if (window.location.hash === '#/player-list' && settings.isPlayerGrid) {
                window.location = '#/player-grid';
            } else {
                dataService.getAllPlayers(function (getAllPlayerResponse) {
                    self.players = getAllPlayerResponse;
                });
            }
        });
    };

    PlayerListViewModel.prototype.goToPlayerGrid = function () {
        new UserSettings().setValue('isPlayerGrid', true, function () {
            window.location = '#/player-grid';
        });
    };

    PlayerListViewModel.prototype.goToPlayerList = function () {
        new UserSettings().setValue('isPlayerGrid', false, function () {
            window.location = '#/player-list';
        });
    };

    PlayerListViewModel.prototype.goToPlayerSelect = function (player, event) {
        window.location = '#/player-details/' + player.id;
    };

    PlayerListViewModel.prototype.goToKombatKodes = function () {
        window.location = '#/kombatkodes';
    };

    return PlayerListViewModel;
}(window, DataService, UserSettings));