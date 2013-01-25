// Views.mini-profile
define(['underscoreM', 'marionette', 'text!templates/mini-profile.htm'], function (_, Marionette, template) {
    return Marionette.ItemView.extend({
        template: _.template(template)
    });
});