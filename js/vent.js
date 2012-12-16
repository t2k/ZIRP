// vent.js   inter-app event processing  using the Backbone.Wreqr plugin
// exports  Backbone.Wreqr
define(['marionette'], function (Marionette) {
    "use strict";
    return new Marionette.EventAggregator();
});
