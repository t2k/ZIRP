//Views.profile.js
define(['underscoreM', 'marionette', 'text!templates/profile-view.htm'], function (_, Marionette, template) {
    return Marionette.ItemView.extend({
        template: _.template(template)
    });
});