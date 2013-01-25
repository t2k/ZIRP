// anonymous base model
define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        defaults: {
            id: null,
            uid: null,
            fn: null,
            img: null,
            bio: null,
            dpt: null,
            ctr: null,
            zd: 0,
            fc: 0,
            f2: 0,
            zirpen:null
        },

        // important to overide the id defaults here
        idAttribute: 'uid',

        urlRoot: '/api/profile/profile',

        // important, my api/profile get returns {profile: profile, zirpen: zirpen}  
        // use parse to strip this out of the restful response.  
        // the profile API reurns a top level profile and zirpen object 
        parse: function (response) {
            // this.zirpen = response.zirpen; (bad idea)
            return response.profile;
        }
    });
});
