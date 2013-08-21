Ext.define('AM.controller.WorkProjectReports', {
  extend: 'Ext.app.Controller',

  // stores: ['Incomes'],
  // models: ['Income'],

  views: [
    'report.WorkProject',
		'report.workproject.List',
		'Viewport'
  ],

	refs: [
		{
			ref: 'list',
			selector: 'workprojectList'
		} ,
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
		// panel.buildChartAndList();
	},

	clearList: function(){
		console.log("from the clearList");
	},
	
	updateList: function(clickedPoint, viewType, chart){
		console.log("from the updateList");
		console.log("The series is clicked");
		console.log("clickedPoint");
		console.log(clickedPoint);
		console.log("\nviewType:");
		console.log( viewType );
		var list = this.getList(); 
		// var selectedDateArray = clickedPoint.value[0].split('/');
		// var selectedDate = new Date(
		// 		selectedDateArray[0],
		// 		selectedDateArray[1]-1, // in javascript, month starts from 0
		// 		selectedDateArray[2]
		// 	);
		// 
		
		// get the store. 
		// for the one with given field, what is the ID?
		
		var recordName = clickedPoint.value[0];
		result = chart.store1.queryBy(function(record){
			console.log("\n=========");
			console.log("The record is ");
			console.log( record ); 
			console.log( record.get("name"));
			console.log("clickedPoint");
			console.log( clickedPoint.value[0]);
			return record.get("name") === recordName;
			
		})
		
		console.log("The result:");
		console.log( result ) ;
 
		if( result.length !==0 ){
			console.log("The firs result");
			console.log( result.length);
			console.log( result.items[0].get('name') );
			console.log("The id:  " + result.items[0].get('id'));
		}else{
			return;
		}
		
		
		
		var viewValue = 0;
		if( viewType === 'month'){
			viewValue = 1;
		}
		
		var viewport = this.getViewport();
		
		list.store.getProxy().extraParams = {
		    viewValue : viewValue,
				selectedRecordId: result.items[0].get('id')
		};
		
		
		viewport.setLoading(true);
		list.store.load({
			// params: {
			// 	viewValue : viewValue,
			// 	selectedRecordId: result.items[0].get('id')
			// },
			callback : function(records, options, success){
				list.setTitle(recordName );
				viewport.setLoading(false);
			}
		});
		
	},
	
	onActivePanel: function(){
		console.log("from the onActivePanel");
	},
	
	onAfterRender: function(panel){
		var list = this.getList(); 
		list.store.loadData([],false);
	},
	
	
	onDestroy: function(){
		console.log("from the onDestroy");
		
	},
	
	onBeforeDestroy: function(){
		console.log("from the onBeforeDestroy");
		// normalize the extraParams
		var list = this.getList(); 
		list.store.getProxy().extraParams = {};
		
	},
	




});
