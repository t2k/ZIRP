// views.timelineItem.js
define(['require', 'underscoreM', 'marionette', 'text!templates/timelineItem.htm', 'vent'], function (require, _, Marionette, template, vent) {
    return Marionette.ItemView.extend({
        template: _.template(template),
        //tagName: 'li',
        className: 'row-fluid',

        events: {
            // Delegated events for creating new items, and clearing completed ones.
            "click a.user-profile-link": "onAnchorClick"
        },

        onAnchorClick: function (e) {
            
            e.preventDefault();
            var ProfileView = require('views/composite-profile');
            var ProfileModel = require('models/models.profile');
            var userProfile = new ProfileModel({ uid: this.model.get('uid') });
            var TweetsModel = require('models/timelineCollection');
            var recentTweets = new TweetsModel();
            recentTweets.url = '/api/tweets/zirpen/' + this.model.get('uid') + '/0/5';

            $.when(userProfile.fetch()).then(function () {

                var view = new ProfileView({ model: userProfile, collection: recentTweets });
                console.log('vent.trigger app:dialog');
                vent.trigger('app:dialog', view);
                recentTweets.fetch();
            });

        }
    });

});