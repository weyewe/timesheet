Ext.define('AM.controller.MasterEmployeeWorkCategoryReports', {
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
      'masterreportemployeeWorkCategoryReport chartInspect': {
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
	recordSelectionChange: function(record){
		console.log("Record selection change");
		console.log("The record  is : "  );
		console.log( record ) 
		console.log( record.selected ) ;
		var recordList = this.getRecordList(); 
		var report = this.getWorkCategoryReport();
		if (recordList.getSelectionModel().hasSelection()) {
		   var row = recordList.getSelectionModel().getSelection()[0];
			console.log("The selected record id");
		   console.log(row.get('id'));
		
			var id = row.get("id");
			var chartInspect = report.down('chartInspect');
			chartInspect.selectedRecordId = id ;
			chartInspect.loadStore();
		}
		// var report = this.getWorkCategoryReport();
		// report.loadStore();
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
		
		var selectedParentRecordId = null;
		var recordList = this.getRecordList();  
		if (recordList.getSelectionModel().hasSelection()) {
		   var row = recordList.getSelectionModel().getSelection()[0];
			console.log("The selected parent record id");
		   console.log(row.get('id'));
		
			var id = row.get("id"); 
			selectedParentRecordId = id ; 
		}
		
		var viewport = this.getViewport();
		
		list.store.getProxy().extraParams = {
		    viewValue : viewValue,  // for the date 
				selectedRecordId: result.items[0].get('id'), // for the perspective's object id 
				perspective: 'category',
				viewer: 'master',
				selectedParentRecordId: selectedParentRecordId,
				parentRecordType : 'user',
				companyView : false,
				focusDate :  Ext.Date.format( chart.currentFocusDate, 'Y-m-d H:i:s'),
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
