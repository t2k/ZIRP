// Filename: Controllers/index.js
define(function (require) {
    var $ = require('jquery'),
    _ = require('underscoreM'),
    Marionette = require('marionette'),
    vent = require('vent'),
    WtfUserColl = require('models/collections.user'),
    ProfileModel = require('models/models.profile'),
    TimelineModel = require('models/timelineCollection'); //({ url: '/api/tweets/timeline/' + this.userName }),


    var Controller = {},
    tweets = new TimelineModel(),
    wtfCollection = new WtfUserColl(),
    loggedInUser = new ProfileModel(); //{ uid: this.userName });

    // private main layout for app/index route
    var LayoutIndex = Marionette.Layout.extend({
        template: _.template(require('text!templates/layout-index.htm')),

        initialize: function (options) {
            if (options && options.uid) {
                //this.uid = options.uid;
                //Controller.loggedInUser = new ProfileModel({ uid: this.userName });
                //Controller.tweets = new TimeLine();


            }
        },


        regions: {
            navbar: '.navbar',              // main nav fixed top
            container: '.appcontainer',  // contains the whole app below nav
            profile: '#profile-container',  // can display another profile across top
            dashboard: '.dashboard',   // user mini-profile/wtf/trending/ copyright etc
            contentmain: '.content-main'  // tweets go here...
        },

        onRender: function () {
            //this.nav.show(navView);
        }
    })


    // private nested layout  
    var LayoutDashboard = Marionette.Layout.extend({
        // note {model: xxx} is passed in
        tag: 'section',
        template: _.template(require('text!templates/layout-dashboard.htm')),
        regions: {
            profileMini: '.profile-mini',
            wtf: '.profile-wtf',
            trends: '.profile-trend'
        },
        initialize: function (options) {
            this.model = options.model;
            this.collection = options.collection;

        },
        ui: {

        },
        events: {

        },

        onRender: function () {
            //console.log('dashboard onRender');
            var V1 = require('views/wtfComposite');
            this.profileMini.show(new LayoutMiniProfile({ model: this.model }));
            /*
            if (console) {
                console.log('dashboard-after profileMini.show');
            } */
            this.wtf.show(new V1({ title: 'Who to follow?', collection: this.collection }));
            //console.log('dashboard-after wtf.show');
            //this.trends.show(new Layoutwtf());
        }

    });


    // private nested layout  indide 
    var LayoutMiniProfile = Marionette.Layout.extend({
        // note {model: xxx} is passed in
        tag: 'section',
        className: 'module mini-profile',
        template: _.template(require('text!templates/layout-mini-profile.htm')),
        regions: {
            profileSummary: '.profile-summary',
            profileStats: '.profile-stats',
            tweetBox: '.tweet-box'
        },

/*
        initialize: function () { },

        ui: {},

        events: {},
*/
        onRender: function () {
            var V1 = require('views/mini-profile-summary'),
            V2 = require('views/mini-profile-stats'),
            V3 = require('views/mini-tweet-box')
            this.profileSummary.show(new V1({ model: this.model }));
            this.profileStats.show(new V2({ model: this.model }));
            this.tweetBox.show(new V3({ uid: this.model.get('uid') }));
            //console.log('layoutMiniProfile:onRender');
        }
    });


    var _initializeLayout = function () {
        /*
        if (console) {
            console.log('initializeLayout...');
        }
        */
        Controller.layout = new LayoutIndex();
        //console.log(options);
        //Controller.miniProfile = new LayoutMiniProfile();
        Controller.layout.on("show", function () {
            vent.trigger("layout:rendered");
            //var NavView = require('Views/views.nav-main');

        });
        vent.trigger('app:show', Controller.layout);
    };


    Controller.index = function () {
        _initializeLayout();
        loggedInUser.set('uid', this.userName);
        var TimelineView = require('views/timelineComposite');
        tweets.url = '/api/tweets/timeline/' + this.userName;
        wtfCollection.url = '/api/WTF/' + this.userName + '/0/5';  // page 0 size 4 ie first 4 wtf items
        var NavView = require('views/views.nav-main');
        var timelineView = new TimelineView({ collection: tweets });


        $.when(loggedInUser.fetch()).then(function () {
            var dashLayout = new LayoutDashboard({ model: loggedInUser, collection: wtfCollection }),
            navView = new NavView({ model: loggedInUser });
            Controller.layout.navbar.show(navView);
            Controller.layout.dashboard.show(dashLayout); //this.navbar.show(navView);
            Controller.layout.contentmain.show(timelineView);
            tweets.fetch();
            wtfCollection.fetch();
        });

    };

    /*
    Controller.home = function (id) {

    if (console) {
    console.log('INSIDE:  HOME route with param ' + id);
    }

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

    };


    Controller.followers = function (id) {
    if (console) { console.log('INSIDE:  FOLLOWERS route with param ' + id); };

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
    };


    Controller.following = function (id) {
    if (console) { console.log('INSIDE:  FOLLOWING route with param ' + id); };

        
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

    */

    var init = function (options) {
        if (options && options.userName) {
            Controller.userName = options.userName;
            //alert(Controller.userName);
        }
        return Controller;
    };

    return init;

});



