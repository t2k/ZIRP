// inject user model into the
define(['backbone', 'models/models.user'], function (Backbone, Model) {
    //    var Backbone = require('backbone'),
    //    Model = require('models/models.user');

    return Backbone.Collection.extend({
        model: Model,

        parse: function (response) {
            return response.users;
        }
        // other collection attributes here...
    });

});

