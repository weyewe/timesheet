Ext.define('AM.controller.WorkCategoryReports', {
  extend: 'Ext.app.Controller',

  // stores: ['Incomes'],
  // models: ['Income'],

  views: [
    'report.WorkCategory',
		'report.workcategory.List',
		'Viewport'
  ],

	refs: [
		{
			ref: 'list',
			selector: 'workcategoryList'
		} ,
		{
			ref: 'viewport',
			selector: 'vp'
		},
		{
			ref : 'workCategoryReport',
			selector : 'workCategoryReport'
		} 
	],

  init: function() {
 
	
    this.control({
      'workCategoryReport': {
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
		// console.log("onBeforeRender");
		// panel.buildChartAndList();
		var list = this.getList(); 
		list.store.loadData([],false);
	},

	clearList: function(){
		// console.log("from the clearList");
		var list = this.getList(); 
		list.store.loadData([],false);
		list.setTitle('');
		
		// list.reload();
		// list.store.getProxy().extraParams = {};
	},
	
	updateList: function(clickedPoint, viewType, chart){
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
		var list = this.getList(); 
		list.store.loadData([],false);
	},
	
	
	onDestroy: function(){
	},
	
	onBeforeDestroy: function(){
		var list = this.getList(); 
		list.store.getProxy().extraParams = {};
		
	},

});
