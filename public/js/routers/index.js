// index.js
define(['marionette'], function (Marionette) {
    'use strict';

    return {
        Router: Marionette.AppRouter.extend({
            appRoutes: {
                '': 'index'
            }
        })
    };

});