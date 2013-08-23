Ext.define('AM.view.master.report.employee.WorkProject', {
    extend: 'Ext.Container',
    alias: 'widget.masterreportemployeeWorkProjectReport',

		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		header: false, 
		headerAsText : false, 
		
		initComponent: function(){
			var me = this; 
			// me.buildToolbar();
			
			// console.log("init component of masterreportemployeeWorkProjectReport");
			
			this.items = [  {
				xtype : 'masterreportuserList',
				// xtype : 'container',
				// html : "Awesome shite",
				flex: 2 
			},
			me.buildChartInspect() ];
			
	    this.callParent(arguments);
		},
		
	 
		
		buildChartInspect: function(){
			// console.log("build Chart Inspect called");
			return {
					xtype : "chartInspect",
					chartStoreFields : [
						'name',
						'data1',
						'id'
					],
					chartStoreUrl :  'api/work_project_reports', 
					listXType: 'workprojectList',
					yAxisLabel : "Time Spent (mins)",
					xAxisLabel : "Project",
					panelTitle: "Project",
					flex: 7,
					chartListWrapperXType: 'masterreportemployeeWorkProjectReport',
					autoChartLoad: false 
				} 
		},

 		
});
