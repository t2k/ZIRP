// wtfitem.js
//  this item view is responible for creating the extended profile view (with recent tweets + stats)
// it get's displayed by the app:dialog event 
define(function (require) {
    $ = require('jquery'),
    _ = require('underscoreM'),
    Marionette = require('marionette'),
    template = require('text!templates/wtf-item.htm'),
    vent = require('vent');

    return Marionette.ItemView.extend({
        template: _.template(template),
        tagName: 'p',
        className: 'row-fluid',

        events: {
            'click a.user-profile-link': 'onProfileClick'
        },

        // when userprofile link clicks
        //  create profiel model and recenttweets collection
        // pass these onto compsite-profile view then
        // pass this view to the app's modal event
        onProfileClick: function (e) {
            e.preventDefault();
            var ProfileView = require('views/composite-profile');
            var ProfileModel = require('models/models.profile');
            var userProfile = new ProfileModel({ uid: this.model.get('uid') });
            var TweetsModel = require('models/timelineCollection');
            var recentTweets = new TweetsModel();
            recentTweets.url = '/api/tweets/zirpen/' + this.model.get('uid') + '/0/5';

            $.when(userProfile.fetch()).then(function () {
                var view = new ProfileView({ model: userProfile, collection: recentTweets });
                vent.trigger('app:dialog', view);
                recentTweets.fetch();
            });
        }
    });
});

