Ext.define('AM.controller.WorkProjectReports', {
  extend: 'Ext.app.Controller',

  // stores: ['Incomes'],
  // models: ['Income'],

  views: [
    'report.WorkProject',
		'Viewport'
  ],

	refs: [
		{
			ref: 'viewport',
			selector: 'vp'
		},
		{
			ref : 'workProjectReport',
			selector : 'workProjectReport'
		} 
	],

  init: function() {
 
	
    this.control({
      'workProjectReport': {
        'chartLoaded': this.clearList ,
				'seriesClicked' : this.updateList,
				'activate' : this.onActivePanel,
				'afterrender' : this.onAfterRender,
				'destroy' : this.onDestroy,
				'beforedestroy' : this.onBeforeDestroy,
				'beforerender': this.onBeforeRender
      } 
		
    });
  },

	onBeforeRender: function(panel ){
		console.log("onBeforeRender");
		panel.buildChartAndList();
	},

	clearList: function(){
		console.log("from the clearList");
	},
	
	updateList: function(){
		console.log("from the updateList");
	},
	
	onActivePanel: function(){
		console.log("from the onActivePanel");
	},
	
	onAfterRender: function(panel){
		console.log("from the WorkProjectReports#onAfterRender");
		console.log( "Total number of items: " + panel.items.length );
		// alert("After Render.. we are gonna create the chart");
		
		// now, get the wrapper for the chart.. get the config from server 
		// Create the chart. 
		
		// How about the list? Depends on what we want <3
		// check how our booker app did it. 
	},
	
	
	onDestroy: function(){
		console.log("from the onDestroy");
		
	},
	
	onBeforeDestroy: function(){
		console.log("from the onBeforeDestroy");
		
	},
	




});
