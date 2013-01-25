// mini-tweet-box.js
define(['jquery', 'underscoreM', 'marionette', 'text!templates/mini-tweet-box.htm', 'models/models.zirpen', 'utils/jquery.textCounter'], function ($, _, Marionette, template, TweetModel) {
    return Marionette.ItemView.extend({
        className: 'row-fluid',
        template: _.template(template),

        ui: {
            counter:    '#tweet-counter',
            tweet: '#zirpen',
            tweetBtn: '#zirpen-button'
        },

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click .btn': 'postZirpen',  // note: primary-btn class is toggled by textcounter.js if over 140 chars cannot post msg
            'click #zirpen': 'expandZirpen',
            'blur #zirpen': 'condenseZirpen'
        },

        initialize: function (options) {
            this.uid = options.uid;

        },
        
        onRender: function () {
            this.$(this.ui.counter).textCounter({ target: this.ui.tweet,  action: this.ui.tweetBtn });
        },

        expandZirpen: function (e) {
            this.ui.tweet.attr('rows', 4);
            //this.ui.tweet.animate({ 'height': '60px' }); //attr('rows', 4); //.$('#zirpen').parent().parent().parent().removeClass('condensed');
        },

        condenseZirpen: function (e) {
            //var $t = this.$('#zirpen');
            if (this.ui.tweet.val().length === 0) {
                this.ui.tweet.attr('rows', 1);
                //this.ui.tweet.animate({ 'height': '18px' });
            }
        },

        postZirpen: function (e) {
            e.preventDefault();
            // how about trigger an event for 

            //alert(this.uid);
            var tweet = new TweetModel({ userid: this.uid, zirp: this.ui.tweet.val().trim() });
            tweet.save();
        }

    });
});