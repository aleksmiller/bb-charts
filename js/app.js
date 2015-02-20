define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.layoutmanager'
], function($, _, Backbone, LayoutManager) {
  var app = window.app || {};
  var JST = window.JST = window.JST || {};

  Backbone.Layout.configure({
    manage: true,

    prefix: "templates/",

    fetchTemplate: function( path ) {

      if (JST[path]) {
        return JST[path];
      }

      var done = this.async();

      $.get(path + '.html', function(contents) {
        done(_.template(contents));
      }, "text");
    }
  });

  return app;
});
