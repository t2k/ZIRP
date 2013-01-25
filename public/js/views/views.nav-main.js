// views/views.nav-main
define(['jquery', 'underscoreM', 'marionette', 'text!templates/nav-main.htm', 'bootstrapDropdown' ], function ($, _, Marionette, template) {
    return Marionette.ItemView.extend({
        className: 'navbar-inner',
        template: _.template(template),

        ui: {
            li: 'li'
        },

        events: {
            'click ul.nav > li a': 'highlightUI'
        },

        highlightUI: function (e) {
            //if (console) { console.log('NavMain: highlightUI'); }
            this.ui.li.removeClass('active');
            $(e.currentTarget).parent().addClass('active');
        }

    });
});