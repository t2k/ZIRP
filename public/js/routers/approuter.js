// approutes.js  
define(['marionette'], function (Marionette) {
    'use strict';

    var approutes = {};

    approutes.Router = Marionette.AppRouter.extend({

        appRoutes: {
            '': 'index',
            '!/:id': 'home',
            '!/:id/followers': 'followers',
            '!/:id/following': 'following',
            '!/:id/profile': 'profile',
            'connect': 'connect',
            'discover': 'discover',
            '*path': 'defaultRoute'
            //'/followers/:id': 'showFollowers',
            //'/following/:id': 'showFollowing'
        }

    });

    return approutes;
});