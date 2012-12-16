//composite-profile   views.profile-dialog
define(['jquery', 'underscoreM', 'marionette', 'text!templates/profile.dialog.htm', 'Views/timelineitem'], function ($, _, Marionette, template, ItemView) {
    return Marionette.CompositeView.extend({
        template: _.template(template),
        itemView: ItemView,
        itemViewContainer: '.recent-tweets',  // note: #stream-items is defined withing Template

        ui: {},
        events: {},

        initialize: function () {
        },

        onRender: function () {
            //console.log('onRender: composite-profile');
        }
    });
});