/*globals ko*/
(function (ko) {
    'use strict';
    ko.components.register('mk-move', {
        viewModel: function (params) {
            return params.viewModel;
        },
        template: { fromUrl: 'html/components/mk-move.html' }
    });
}(ko));