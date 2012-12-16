// mini-profile-stats.js
define(['underscoreM', 'marionette', 'text!templates/mini-profile-stats.htm'], function (_, Marionette, template) {
    return Marionette.ItemView.extend({
        className: 'row-fluid',
        template: _.template(template)
    });
});