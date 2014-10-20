/*globals ko*/
(function (ko) {
    'use strict';
    ko.components.register('player-move', {
        viewModel: function (params) {
            return params.viewModel;
        },
        template: { fromUrl: 'html/components/player-move.html' }
    });
}(ko));