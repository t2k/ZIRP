// collections.timeline  aka tweets collection
define(['backbone', 'models/models.zirpen'], function (Backbone, Model) {

    return Backbone.Collection.extend({
        fetchDate: null,  // my attribute for fetching next batch
        model: Model,

        // important our API returns the timeline/zirpen collection embedded two levels @ data.zirpens
        parse: function (response) {
            // fetchdate used for endless scrolling
            this.fetchDate = response.data.tsmin;
            // backbone's parse method is very useful here...
            return response.data.zirpens;
        }
    });
});