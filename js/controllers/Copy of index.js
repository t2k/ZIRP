// Filename: Controllers/appcontroller.js
define(function (require) {
    $ = require('jquery'),
    _ = require('underscoreM'),
    Marionette = require('marionette'),
    vent = require('vent');

    var Controller = {};

    // private
    var Layout = Marionette.Layout.extend({
        template: _.template(require('text!templates/app2.htm')),
        regions: {
            nav: '.navbar',
            container: '.container-fluid',
            dashboard: '.dashboard',   // user mini profile/ tweet box etc
            content: '.content-main'  // tweets go here...
        }
    });

    var LayoutMiniProfile = Marionette.Layout.extend({
        template: _.template(require('text!templates/layout-minit-profile.htm')),
        regions: {
            profileSummary: '.profile-summary',
            profileStats: '.profile-stats',
            tweetBox: '.tweet-box'
        },
        initialize: function () { },
        ui: {},
        events: {},
        onRender: function () { }
    });

    var _initializeLayout = function () {
        console.log('initializeLayout...');
        Controller.layout = new Layout();
        Controller.layout.on("show", function () {
            vent.trigger("layout:rendered");
        });
        vent.trigger('app:show', Controller.layout);
    };

    // unhandled routes go here!
    Controller.defaultRoute = function (path) {
        if (console) { console.log('UNHANDLED ROUTE! ' + path); };
    };

    Controller.index = function () {
        _initializeLayout();

        var TimeLine = require('Models/Collections.Timeline'), //({ url: '/api/tweets/timeline/' + this.userName }),
        tweets = new TimeLine(),
        ProfileModel = require('Models/models.profile'),
        homeUser = new ProfileModel({ uid: this.userName }), // username passed in duringinit
        TimelineView = require('Views/timelinecomposite'),

        // miniProfileView = require('views.mini-profile'),
        // wtfView = require('views.module-wtf'),
        NavView = require('Views/views.nav-main');

        // zirpBoxView = require('views.zirpen-box'),
        //userColl = require('collections.user'),
        tweets.url = '/api/tweets/timeline/' + this.userName;
        var timelineView = new TimelineView({ collection: tweets });
        navView = new NavView({ model: homeUser });


        // who to follow
        // userColl.url = '/api/wtf/' + this.userName + '/0/4';  // page 0 size 4 ie first 4 wtf items


        Controller.layout.content.show(timelineView);
        tweets.fetch();

        $.when(homeUser.fetch()).then(function () {
            Controller.layout.nav.show(navView);
        });

        //homeUser.fetch();


        //var mpView = new miniProfileView({ el: '.mini-profile', model: homeUser }).render();
        //var zirpView = new zirpBoxView({ uid: homeUser.get('uid') }).render();
        //$(zirpView.el).appendTo(mpView.el);

        // append who to follow module view to the dashboard
        /*
        $.when(userColl.fetch()).then(function () {
        $.wait(10).then(function () {
        $(new wtfView({ collection: userColl }).render().el).appendTo($('.dashboard'));
        });

        });
        */


        // dependency injection pattern:  decouple objects from DOM

        //tweets.fetch();  // timelineView responds to the 'reset' event triggered here...

    };

    // 
    Controller.home = function (id) {

        if (console) {
            console.log('INSIDE:  HOME route with param ' + id);
        }
        /*
        var profileModel = require('models.profile'),
        //profileView = require('views.profile'),
        //tweets = require('collections.timeline'),
        // note by passing uid attrib (overridden w/ idAttrib:uid in model the fetch will append the id to the route
        selUser = new profileModel({ uid: id });

        //tweets.url = '/api/timeline/' + id;

        $.when(selUser.fetch()).then(function () {
        var pView = require('views.profile'),
        pNavView = require('views.profileNav');
        // dependency intection
        $(new pView({ model: selUser }).render().el).appendTo($('#profile-container').empty()); // static nav view
        $(new pNavView({ model: selUser }).render().el).appendTo($('.dashboard').empty()); // static nav view
        $('#appModal').modal('hide');
        });
        */

    };


    Controller.followers = function (id) {
        if (console) { console.log('INSIDE:  FOLLOWERS route with param ' + id); };
        /*
        var profileModel = require('models.profile'),
        selUser = new profileModel({ uid: id }),
        collection = require('collections.user');


        $.when(selUser.fetch()).then(function () {
        var pView = require('views.profile'),
        pNavView = require('views.profileNav'),
        followersView = require('views.followerCollection');
        // dependency intection
        $(new pView({ model: selUser }).render().el).appendTo($('#profile-container').empty()); // static nav view
        $(new pNavView({ model: selUser }).render().el).appendTo($('.dashboard').empty()); // static nav view
        collection.url = '/api/followers/' + selUser.get('uid') + '/0/12';  // page 0 size 4 ie first 4 wtf items

        $.when(collection.fetch()).then(function () {
        $('#stream-items-id').empty();
        new followersView({ collection: collection, el: $('#stream-items-id') }).render();
        $('#appModal').modal('hide');
        });
        });
        */
    };


    Controller.following = function (id) {
        if (console) { console.log('INSIDE:  FOLLOWING route with param ' + id); };
        /*

        
        var profileModel = require('models.profile'),
        selUser = new profileModel({ uid: id }),
        followingColl = require('collections.user');


        $.when(selUser.fetch()).then(function () {
        var pView = require('views.profile'),
        pNavView = require('views.profileNav'),
        followingView = require('views.followingCollection');
        // dependency intection
        $(new pView({ model: selUser }).render().el).appendTo($('#profile-container').empty()); // static nav view
        $(new pNavView({ model: selUser }).render().el).appendTo($('.dashboard').empty()); // static nav view
        followingColl.url = '/api/following/' + selUser.get('uid') + '/0/12';  // page 0 size 4 ie first 4 wtf items

        $.when(followingColl.fetch()).then(function () {
        $.wait(100).then(function () {
        $('#stream-items-id').empty();
        new followingView({ collection: followingColl, el: $('#stream-items-id') }).render();
        $('#appModal').modal('hide');
        });

        });
        });
        */
    };

    Controller.profile = function (id) {
        if (console) { console.log('INSIDE:  PROFILE route with param ' + id); };
    };

    Controller.connect = function () {
        if (console) { console.log('INSIDE:  CONNECT route with param '); };
    };


    Controller.discover = function () {
        if (console) { console.log('INSIDE:  DISCOVER route with param '); };
    };

    var init = function (options) {
        if (options && options.userName) {
            Controller.userName = options.userName;
        }
        return Controller;
    };

    return init;

});



