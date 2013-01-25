// collection view timelines have collection of timeline models render themseleves
define(['underscoreM', 'marionette', 'text!templates/followerCollection.htm', 'views/views.userItem'], function (_, Marionette, template, itemView) {
    return Marionette.CompositeView.extend({
        template: _.template(template),
        itemView: itemView,
        itemViewContainer: '',

        initialize: function (options) {
            if (options && options.itemViewContainer) {
                this.itemViewContainer = options.itemViewContainer;
            }

            //_.bindAll(this, 'render', 'addAll', 'addItem');
            //_.bindAll(this, 'render', 'addItem');
            //this.collection.bind('add', this.addItem);
            ///this.collection.on('add', this.addItem, this);
        },


        events: {
            // Delegated events for creating new items, and clearing completed ones.
        },

        ui: {
            title: '.js-stream-title'
        },

        onRender: function () {
            ui.title.html(this.template({ title: "Following" }));
        }

        /*,

        render: function () {
        //console.log('timelines: render');
        $('span.js-stream-title').html();
        this.addAll();
        return this;
        },

        addAll: function () {
        //console.log('timelines: addAll');
        if (this.collection) {
        this.collection.each(this.addItem);
        }
        },

        addItem: function (model) {
        //console.log('timelines: addItem');
        view = new itemView({ model: model });
        view.render();
        this.$el.append(view.el);
        model.on('remove', view.remove, this);
        }
        */
    });

});