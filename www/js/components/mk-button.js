/*globals ko*/
(function (ko) {
    'use strict';
    ko.components.register('mk-button', {
        viewModel: function (params) {
            return params.viewModel;
        },
        template: { fromUrl: 'html/components/mk-button.html' }
    });
}(ko));