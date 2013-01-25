// collection view timelines have collection of timeline models render themseleves
define(['underscoreM', 'marionette', 'views/timelineItem', 'text!templates/composite-timeline.htm'], function (_, Marionette, ItemView, Template) {
    return Marionette.CompositeView.extend({
        template: _.template(Template),
        itemView: ItemView,
        itemViewContainer: '#stream-items',  // note: #stream-items is defined withing Template

        initialize: function () {
            this.bindTo(this.collection, 'reset', this.renderTitle, this);
        },

        ui: {
            title: '.stream-title'
        },

        renderTitle: function () {
        /*
            if (console) {
                console.log('renderTitle:timeline');
            }
            */
            this.ui.title.html("Zirpen");
        },

        onRender: function () {
        }

    });
});