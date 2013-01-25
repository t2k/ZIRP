//views.profile-dialog
// todo:  convert this to a CompositeView
define(['jquery', 'underscoreM', 'marionette', 'text!templates/profile.dialog2.htm', 'models/timelineCollection', 'views/views.zirpenCollection'], function ($, _, Marionette, template, ListData, ListView) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        onRender: function () {
            // setup tweets API
            var listData = new ListData();
            listData.url = '/api/tweets/zirpen/' + this.model.get('uid') + '/0/5';

            $.when(listData.fetch()).then(function () {
                new ListView({ collection: listData, el: $('.recent-tweets') }).render();
            });
        }
    });
});