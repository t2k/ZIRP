//views.profileNav.js
define(['jquery', 'underscoreM', 'marionette', 'text!templates/profile-nav.htm'], function ($, _, Marionette, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click ul.js-items-container li a': 'highlightUI'
        },

        ui: {
            li: 'li'
        },

        highlightUI: function (e) {
            ui.li.removeClass('active');
            $(e.currentTarget).parent().addClass('active');
        }

    });
});