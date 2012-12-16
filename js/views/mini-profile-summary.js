// mini-profile-summary.js
define(['underscoreM', 'marionette', 'text!templates/mini-profile-summary.htm'], function (_, Marionette, template) {
    return Marionette.ItemView.extend({
        className: 'row-fluid',
        template: _.template(template)
    });
});