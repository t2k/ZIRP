// Filename: main.js
// 
require.config({
    paths: {
        // note these are all AMD compliant versions
        jquery: '../../components/jquery/jquery',  // amd version
        underscore: '../../components/underscore-amd/underscore', // amd version
        underscoreM: 'libs/underscore/underscore-mustache',  // templating supporting mustache style {{ ... }}
        backbone: '../../components/backbone-amd/backbone', // amd version
        'backbone.wreqr': '../../components/backbone.wreqr/lib/amd/backbone.wreqr', // amd version
        'backbone.eventbinder': '../../components/backbone.eventbinder/lib/amd/backbone.eventbinder', // amd version
        'backbone.babysitter': '../../components/backbone.babysitter/lib/amd/backbone.babysitter', // amd version
        marionette: '../../components/marionette/lib/core/amd/backbone.marionette',  // amd version
        bootstrapModal: '../../components/bootstrap/docs/assets/js/bootstrap-modal', //-2.1.1',  // just using .modal for now but loading entire js bootstrap
        bootstrapDropdown: '../../components/bootstrap/docs/assets/js/bootstrap-dropdown', //-2.1.1',  // just using .modal for now but loading entire js bootstrap
        text: '../../components/requirejs-text/text'
    },

    shim: {
        bootstrapModal: ['jquery'],
        bootstrapDropdown: ['jquery']
    } 
});

require(['app', 'jquery', 'controllers/index', 'routers/index', 'utils/jquery.tkutil'],
        function (app, $, controller, router) {
            // here's the only way I can think of, call latent webservice asyncronously to get the .NET auth username and 
            // dependency inject this into our router;
            // maybe better soln would be to create an app Model with properties that we can change
            // which would trigger events/routes views etc... 
            // this/ legacy ajax/asmx call returns json in a .d wrapper
            $.when($.get.NetAuthUserName()).then(function (response) {
                if (response && response.d && response.d.status === 'success') {
                    //alert(response.d.data.userName);

                    var options = {
                        controller: controller({ userName: response.d.data.userName }),
                        router: router
                    };
                    //
                    app.start(options);
                    
                } else {
                    alert('authentication error starting application...');
                }

            });

        });