// Wiews.module-twf.js collection view timelines have collection of timeline models render themseleves
define(['underscoreM', 'marionette', 'text!templates/layout-wtf.htm', 'Views/wtfItem'], function (_, Marionette, template, itemView) {
    return Marionette.CompositeView.extend({
        template: _.template(template),
        itemView: itemView,
        itemViewContainer: '.wtf-list',

        initialize: function (options) {
            if (options && options.title) {
                this.title = options.title;
            }
            this.bindTo(this.collection, 'reset', this.renderTitle, this);
        },

        ui: {
            title: '.wtf-title'
        },

        renderTitle: function () {
        /*
            if (console) {
                console.log('renderTitle:wtf');
            }
            */
            this.ui.title.html(this.title ? this.title : 'Who to Follow?');
        },

        onRender: function () {

        },

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click a.wtf-refresh': 'refreshSugg',
            'click a.wtf-viewall': 'wtfSuggest'
        },


        refreshSugg: function () {
            alert('refresh');
        },

        wtfSuggest: function () {
            alert('ViewAll');
        }

    });
});