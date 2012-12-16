// collection view timelines have collection of timeline models render themseleves
define(['underscoreM', 'marionette', 'text!templates/followerCollection.htm', 'Views/Views.userItem'], function (_, Marionette, template, itemView) {
    return Marionette.CompositeView.extend({
        template: _.template(template),
        itemView: itemView,
        itemViewContainer: '',

        // Delegated events for creating new items, and clearing completed ones.
        events: {

        },

        ui: {
            title: '.js-stream-title'
        },

        onRender: function () {
            ui.title.html(this.template({ title: "Followers" }))
        },


        initialize: function (options) {
            //_.bindAll(this, 'render', 'addAll', 'addItem');
            //_.bindAll(this, 'render', 'addItem', 'addAll');
            //this.collection.bind('add', this.addItem);
            //this.bindTo(this.collection, 'add', this.addItem, this);
            //this.collection.on('add', this.addItem, this);
        } /* ,

          addAll: function () {
              //console.log('timelines: addAll');
              this.collection.each(this.addItem);
          },

          addItem: function (model) {
              //console.log('timelines: addItem');
              view = new itemView({ model: model });
              view.render();
              this.$el.append(view.el);
              //model.bind('remove', view.remove);
              model.on('remove', view.remove, this);
          }
          */
    });
});