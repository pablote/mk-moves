/*globals _, data, DataFixer */
var DataService = (function (DataFixer) {
    'use strict';
    var DataService = function () {
        var dataFixer = new DataFixer();
        dataFixer.applyCorrections(data.moves);
    };

    DataService.prototype.getAllPlayers = function (callback) {
        callback(data.characters);
    };

    DataService.prototype.getPlayer = function (id, callback) {
        id = parseInt(id, 10);

        _.each(data.characters, function (value) {
            if (value.id === id) {
                callback(value);
            }
        });
    };

    DataService.prototype.getPlayerMoves = function (id, callback) {
        id = parseInt(id, 10);

        _.each(data.moves, function (value) {
            if (value.id === id) {
                callback(value);
            }
        });
    };

    DataService.prototype.getKombatKodes = function (callback) {
        callback(data.kodes);
    };

    return DataService;
}(DataFixer));