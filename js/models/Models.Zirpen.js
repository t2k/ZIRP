// anonymous base model zirpen
define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        defaults: {
            timestamp: null,
            live: true
        },

        url: '/api/tweets/zirpen',
        validate: function (attr) {
            if (attr.zirp.length > 140) {
                return '140 char. max';
            }
        }
    });
});