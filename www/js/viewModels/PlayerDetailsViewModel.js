/*globals window, setTimeout, ko, _, UserSettings, DataService, MoveViewModel, PlayerViewModel */
var PlayerDetailsViewModel = (function () {
    'use strict';
    var PlayerDetailsViewModel = function () {
        this.playerId = parseInt(window.routeParams.playerId, 10);
        this.isLoading = ko.observable(false);
        this.moves = ko.observableArray();
        this.players = [];
        this.isXbox = ko.observable(true);
        this.isLeft = ko.observable(true);

        this.refreshUI();
    };

    function createItemGroupViewModel(itemGroup, settings) {
        var itemGroupViewModel = {
            name: itemGroup.name,
            items: []
        };

        _.each(itemGroup.items, function (item) {
            var moveViewModel = new MoveViewModel(item, settings);

            itemGroupViewModel.items.push(moveViewModel);
        });

        return itemGroupViewModel;
    }

    PlayerDetailsViewModel.prototype.refreshUI = function () {
        var self = this;
        self.isLoading(true);
        self.moves([]);
        self.players = [];

        var userSettings = new UserSettings();
        var dataService = new DataService();

        userSettings.getConfig(function (settings) {
            self.isXbox(settings.isXbox);
            self.isLeft(settings.isLeft);

            dataService.getAllPlayers(function (getAllPlayerResponse) {
                _.each(getAllPlayerResponse, function (player) {
                    var selected = player.id === self.playerId;
                    self.players.push(new PlayerViewModel(player, selected));
                });
            });

            dataService.getPlayerMoves(self.playerId, function (getPlayerResponse) {
                setTimeout(function () {
                    _.each(getPlayerResponse.itemGroups, function (itemGroup) {
                        self.moves.push(createItemGroupViewModel(itemGroup, settings));
                    });
                    self.isLoading(false);
                }, 20);
            });

            dataService.getPlayer(self.playerId, function (character) {
                self.character = character;
            });
        });
    };

    PlayerDetailsViewModel.prototype.goBackToMain = function () {
        window.location = '#/player-list';
    };

    PlayerDetailsViewModel.prototype.goToBio = function () {
        window.location = '#/player-bio/' + this.playerId;
    };

    PlayerDetailsViewModel.prototype.selectLeft = function () {
        var self = this,
            userSettings = new UserSettings();

        userSettings.getConfig(function (settings) {
            if (settings.isLeft) {
                return;
            }

            self.togglePosition(settings);
        });
    };

    PlayerDetailsViewModel.prototype.selectRight = function () {
        var self = this,
            userSettings = new UserSettings();

        userSettings.getConfig(function (settings) {
            if (!settings.isLeft) {
                return;
            }

            self.togglePosition(settings);
        });
    };

    PlayerDetailsViewModel.prototype.selectXbox = function () {
        var self = this,
            userSettings = new UserSettings();

        userSettings.getConfig(function (settings) {
            if (settings.isXbox) {
                return;
            }

            self.toggleButtons(settings);
        });
    };

    PlayerDetailsViewModel.prototype.selectPS = function () {
        var self = this,
            userSettings = new UserSettings();

        userSettings.getConfig(function (settings) {
            if (!settings.isXbox) {
                return;
            }

            self.toggleButtons(settings);
        });
    };

    PlayerDetailsViewModel.prototype.selectPlayer = function (player) {
        var playerId = player.id;

        window.location = '#/player-details/' + playerId;
    };

    PlayerDetailsViewModel.prototype.togglePosition = function (settings) {
        var self = this,
            userSettings = new UserSettings();

        settings.isLeft = !settings.isLeft;
        userSettings.setConfig(settings, function () {
            self.refreshUI();
        });
    };

    PlayerDetailsViewModel.prototype.toggleButtons = function (settings) {
        var self = this,
            userSettings = new UserSettings();

        settings.isXbox = !settings.isXbox;
        userSettings.setConfig(settings, function () {
            self.refreshUI();
        });
    };

    return PlayerDetailsViewModel;
}());
