/*globals window, setTimeout, ko, _, UserSettings, DataService, MoveViewModel, PlayerViewModel */
var PlayerDetailsViewModel = (function () {
    'use strict';
    var PlayerDetailsViewModel = function () {
        this.playerId = parseInt(window.routeParams.playerId, 10);
        this.isLoading = ko.observable(false);
        this.moves = ko.observableArray();
        this.players = ko.observableArray();
        this.isXbox = ko.observable(true);
        this.isLeft = ko.observable(true);
        this.character = {
            name: ko.observable(''),
            smallImg: ko.observable('')
        };
    };

    function createItemGroupViewModel(self, itemGroup, settings) {
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

    function updateButtons(self, settings) {
        var userSettings = new UserSettings();

        userSettings.setConfig(settings, function () {
            self.isXbox(settings.isXbox);
            self.isLeft(settings.isLeft);

            _.each(self.moves(), function (itemGroup) {
                _.each(itemGroup.items, function (item) {
                    _.each(item.buttons(), function (button) {
                        button.setCode(button.code(), settings);
                    });
                });
            });
        });
    }

    PlayerDetailsViewModel.prototype.init = function () {
        var self = this;
        self.isLoading(true);
        self.moves([]);
        self.players([]);

        var userSettings = new UserSettings();
        var dataService = new DataService();

        // load data
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
                        self.moves.push(createItemGroupViewModel(self, itemGroup, settings));
                    });
                    self.isLoading(false);
                }, 20);
            });

            dataService.getPlayer(self.playerId, function (character) {
                self.character.name(character.name);
                self.character.smallImg(character.smallImg);
            });
        });


        // scroll to selected player
        var selectedPlayer = _.findWhere(self.players(), { selected: true });
        selectedPlayer.$element().scrollIntoView(true);
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
            settings.isLeft = true;
            updateButtons(self, settings);
        });
    };

    PlayerDetailsViewModel.prototype.selectRight = function () {
        var self = this,
            userSettings = new UserSettings();

        userSettings.getConfig(function (settings) {
            settings.isLeft = false;
            updateButtons(self, settings);
        });
    };

    PlayerDetailsViewModel.prototype.selectXbox = function () {
        var self = this,
            userSettings = new UserSettings();

        userSettings.getConfig(function (settings) {
            settings.isXbox = true;
            updateButtons(self, settings);
        });
    };

    PlayerDetailsViewModel.prototype.selectPS = function () {
        var self = this,
            userSettings = new UserSettings();

        userSettings.getConfig(function (settings) {
            settings.isXbox = false;
            updateButtons(self, settings);
        });
    };

    PlayerDetailsViewModel.prototype.selectPlayer = function (player) {
        var playerId = player.id;

        window.location = '#/player-details/' + playerId;
    };

    return PlayerDetailsViewModel;
}());
