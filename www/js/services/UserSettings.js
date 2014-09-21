/*globals localStorage */
var UserSettings = (function () {
    'use strict';
    var userSettingsKey = 'userSettings',
        userSettings = localStorage.getItem(userSettingsKey);

    // set defaults
    if (!userSettings || userSettings === null) {
        localStorage.setItem(userSettingsKey, JSON.stringify(
            {
                isLeft: true,
                isXbox: true,
                isPlayerGrid: false
            }
        ));
    }

    var UserSettings = function () {
    };

    UserSettings.prototype.getConfig = function (callback) {
        callback(JSON.parse(localStorage.getItem(userSettingsKey)));
    };

    UserSettings.prototype.setConfig = function (config, callback) {
        localStorage.setItem(userSettingsKey, JSON.stringify(config));
        callback();
    };

    UserSettings.prototype.setValue = function (key, value, callback) {
        var self = this;
        this.getConfig(function (config) {
            config[key] = value;
            self.setConfig(config, callback);
        });
    };

    return UserSettings;
}());
