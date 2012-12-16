// collection view timelines have collection of timeline models render themseleves
define(['underscoreM', 'marionette', 'Views/timeLineItem', 'text!templates/timeline.htm'], function (_, Marionette, itemView, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),
        itemView: itemView

        /*
        events: {
        // Delegated events for creating new items, and clearing completed ones.
        },


        render: function () {
        this.addAll();
        return this;
        },

        initialize: function (options) {
        if (options || options.title) {
        this.title = options.title;
        }
        _.bindAll(this, 'render', 'addItem');
        this.collection.on('add', this.addItem, this);

        },

        addAll: function () {
        this.collection.each(this.addItem);
        },

        addItem: function (model) {
        view = new itemView({ model: model });
        view.render();
        this.$el.append(view.el);
        model.on('remove', view.remove, this);
        }
        */
    });
});