define([
  'app',
  'modules/chart'
], function(app, Chart) {

  var Router = Backbone.Router.extend({
    initialize: function() {

      var collections = {
        charts: new Chart.Collection()
      }

      _.extend(this, collections);

      var layout = new Backbone.Layout({
        template: 'main'
      });

      $("#main").html(layout.el);

      layout.render();

      layout.setViews({
        '#charts': new Chart.View(collections)
      });
    },

    routes: {
      '': 'index'
    },

    index: function() {
      this.charts.fetch();
    }
  });

  return Router;
});
