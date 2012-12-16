//views.userItem.js
define(['require', 'marionette', 'vent', 'text!templates/userItem.htm'], function (require, Marionette, vent, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click a.js-user-profile-link": "onAnchorClick"
        },

        onAnchorClick: function (e) {

            e.preventDefault();
            var ProfileView = require('views/composite-profile');
            var ProfileModel = require('models/models.profile');
            var userProfile = new ProfileModel({ uid: this.model.get('uid') });
            var TweetsModel = require('models/timelineCollection');
            var recentTweets = new TweetsModel();
            recentTweets.url = '/api/tweets/timeline/' + this.model.get('uid') + '/0/5';

            $.when(userProfile.fetch()).then(function () {
                var view = new ProfileView({ model: userProfile, collection: recentTweets });
                vent.trigger('app:dialog', view);
                recentTweets.fetch();
            });

        }

    });
});