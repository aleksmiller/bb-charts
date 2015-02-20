require.config({
  paths: {
    'jquery': 'assets/jquery',
    'underscore': 'assets/underscore',
    'backbone': 'assets/backbone',
    'backbone.layoutmanager': 'assets/backbone.layoutmanager'
  },

  shim: {
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },

    'underscore': { exports: '_' }
  }
});

require([
  'app',
  'router'
], function(app, Router) {
  app.router = new Router();

  Backbone.history.start({
    pushState: true,
    root: '/'
  });
});
