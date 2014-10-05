/*globals ko */
(function (ko) {
    'use strict';
    // data-bind="element: observable"
    // sets observable to element ..
    ko.bindingHandlers.element = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var target = valueAccessor();
            target(element);
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        }
    };
}(ko));
