define([
  'app',
  'https://www.google.com/jsapi'
], function(app) {

  var Chart = {};

  Chart.Model = Backbone.Model.extend({
    defaults: {
      title: '',
      type: 'LineChart',
      options: {
        width: 480,
        height: 320
      },
      data: []
    }
  });

  Chart.Collection = Backbone.Collection.extend({
    model: Chart.Model,

    url: '/inc/charts.json'
  });

  Chart.View = Backbone.View.extend({
    template: 'chart',

    initialize: function() {
      google.load('visualization', '1', {
        'callback': _.bind(this.drawCharts, this),
        'packages': ['corechart']
      });
    },

    serialize: function(){
      return {
        collection: this.options.charts
      };
    },

    parseData: function(obj){
      var data = [];

      _.map(obj, function(row){
        if(data.length == 0)
          data.push(_.keys(row));

        data.push(_.values(row));
      });

      return data;
    },

    drawCharts: function() {
      _.each(this.options.charts.models, function(model) {
          this.data = new google.visualization.arrayToDataTable(
          this.parseData(model.get('data'))
        );

        this.options = {
          title: model.get('title'),
        };

        _.extend(this.options, model.get('options'));
        this.chart = new google.visualization[ model.get('type') ]( this.$('#chart_' + model.cid).get(0) );
        this.chart.draw(this.data, this.options)
      }, this);
    }
  });

  return Chart;
});
