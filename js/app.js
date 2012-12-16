// app.js  define the marionette application object, app-regions, modulate events (vent) and start backbone.history
define(['backbone', 'marionette', 'vent', 'bootstrapModal'], function (Backbone, Marionette, vent) {

    // set up the app instance
    var App = new Marionette.Application();
    // configuration, setting up regions, etc ...

    // see http://lostechies.com/derickbailey/2012/04/17/managing-a-modal-dialog-with-backbone-and-marionette/
    var ModalRegion = Marionette.Region.extend({
        el: "#modal",

        constructor: function () {
            Marionette.Region.prototype.constructor.apply(this, arguments);
            console.log('modalRegion: constructor');
            this.on("show", this.showModal, this);
        },

        showModal: function (view) {
            console.log('showModal called...');
            view.on("close", this.hideModal, this);
            this.$el.modal('show');
        },

        hideModal: function () {
            this.$el.modal('hide');
        }
    });


    App.addRegions({
        content: "#content",
        modal: ModalRegion
    });

    // refactor, can this be better handled by a route?
    // global event triggers passing in uid of selected user
    vent.on('app:dialog', function (view) {
        //var View = require('views/views.profile-dialog');
        //var user = new profileModel({ uid: data });
        //$.when(user.fetch()).then(function () {
        //view = new dlgView({ model: model });
        console.log('app:dialog handler was called');
        App.modal.show(view); // $('#appModal').html(view.render().el).modal();
        //});
    });

    // show an itemview: in the content region
    vent.on('app:show', function (appView) {
        App.content.show(appView);
    });
    // show an itemview: in the content region
    vent.on('layout:rendered', function () {
        //if (console) { console.log('layout:render==>app'); }
        // App.content.show(appView);
    });


    // marionette app events...
    App.on("initialize:after", function () {
        //if (console) { console.log('initialize:after'); }
        Backbone.history.start();
    });

    // pass in router/controller via options
    App.addInitializer(function (options) {
        // configure for loading templates stored externally...
        Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
            // Marionette expects "templateId" to be the ID of a DOM element.
            // But with RequireJS, templateId is actually the full text of the template.
            var template = templateId;

            // Make sure we have a template before trying to compile it
            if (!template || template.length === 0) {
                var msg = "Could not find template: '" + templateId + "'";
                var err = new Error(msg);
                err.name = "NoTemplateError";
                throw err;
            }
            return template;
        };

        // pass in username to the controller...
        //var controller = new options.controller({userName: options.userName});
        //alert(options.userName);
        //var x = _.extend(options.controller.prototype, {userName: options.userName });
        // init library router/controller
        new options.router.Router({
            controller: options.controller // controller implements search and defaultsearch
        });

    });

    // export the app from this module
    return App;
});