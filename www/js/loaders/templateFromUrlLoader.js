/*globals ko, $ */
(function (ko, $) {
    'use strict';
    var templateFromUrlLoader = {
        loadTemplate: function (name, templateConfig, callback) {
            if (templateConfig.fromUrl) {
                // load template html
                var fullUrl = templateConfig.fromUrl;
                $.get(fullUrl, function (markupString) {
                    // use default loader to convert html string into DOM nodes
                    ko.components.defaultLoader.loadTemplate(name, markupString, callback);
                });
            } else {
                // Unrecognized config format. Let another loader handle it.
                callback(null);
            }
        }
    };

    // register
    ko.components.loaders.unshift(templateFromUrlLoader);
}(ko, $));