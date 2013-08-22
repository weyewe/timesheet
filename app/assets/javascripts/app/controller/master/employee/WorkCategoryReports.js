Ext.define('AM.controller.master.employee.WorkCategoryReports', {
  extend: 'Ext.app.Controller',

  // stores: ['Incomes'],
  // models: ['Income'],

  views: [
    'master.report.employee.WorkCategory',
		'report.workcategory.List',
		'master.report.UserList',
		'Viewport'
  ],

	refs: [
		{
			ref: 'list',
			selector: 'workcategoryList'
		},
		{
			ref: 'recordList',
			selector: 'masterreportuserList'
		},
		{
			ref: 'viewport',
			selector: 'vp'
		},
		{
			ref : 'workCategoryReport',
			selector : 'masterreportemployeeWorkCategoryReport'
		} 
	],

  init: function() {
 		console.log("init controller for master.employee.WorkCategoryReports");
	
    this.control({
      'masterreportemployeeWorkCategoryReport': {
        'chartLoaded': this.clearList ,
				'seriesClicked' : this.updateList,
				'activate' : this.onActivePanel,
				'afterrender' : this.onAfterRender,
				'destroy' : this.onDestroy,
				'beforedestroy' : this.onBeforeDestroy,
				'beforerender': this.onBeforeRender
      } ,
      'masterreportuserList': {
        selectionchange: this.recordSelectionChange,
				afterrender : this.loadRecordList,
      },
		
    });
  },

	loadRecordList: function(){
		var recordList = this.getRecordList();
		recordList.store.load();
	},
	recordSelectionChange: function(){
		console.log("Record selection change");
	},

	onBeforeRender: function(panel ){
		// console.log("onBeforeRender");
		// panel.buildChartAndList();
		var list = this.getList(); 
		list.store.loadData([],false);
	},

	clearList: function(){
		console.log("CHart loaded");
		console.log("from the clearList");
		var list = this.getList(); 
		list.store.loadData([],false);
		list.setTitle('');
		
		// list.reload();
		// list.store.getProxy().extraParams = {};
	},
	
	updateList: function(clickedPoint, viewType, chart){
		console.log("Controller is responding to the shite: seriesClicked");
		var list = this.getList(); 
		
		var recordName = clickedPoint.value[0];
		
		// console.log("The recordName: ");
		// console.log(recordName);
		result = chart.store1.queryBy(function(record){
			return record.get("name") === recordName;
		})
		
		// console.log("The store: ");
		// console.log( chart.store1);
		
		if( result.length === 0 ){
			Ext.Msg.alert("Error", "No series selected");
			return
		}
		
		// console.log("The result: ");
		// console.log( result ) ;
		
		
		var viewValue = 0;
		if( viewType === 'month'){
			viewValue = 1;
		}
		
		var viewport = this.getViewport();
		
		list.store.getProxy().extraParams = {
		    viewValue : viewValue,
				selectedRecordId: result.items[0].get('id'),
				perspective: 'category',
				viewer: 'personal'
		};
		
		
		viewport.setLoading(true);
		list.store.load({
			callback : function(records, options, success){
				list.setTitle(recordName );
				viewport.setLoading(false);
			}
		});
		
	},
	
	onActivePanel: function(){
	},
	
	onAfterRender: function(panel){
		console.log("onAfterRender in master.employee.WorkCategoryReports")
		var list = this.getList(); 
		list.store.loadData([],false);
		
		var recordList = this.getRecordList();
		recordList.store.load();
	},
	
	
	onDestroy: function(){
	},
	
	onBeforeDestroy: function(){
		var list = this.getList(); 
		list.store.getProxy().extraParams = {};
		
	},

});
