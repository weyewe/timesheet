Ext.define('AM.view.report.WorkCategory', {
    extend: 'AM.view.ChartInspect',
    alias: 'widget.workCategoryReport',

		

 		chartStoreFields : [
			'name',
			'data1',
			'id'
		],
		
		chartStoreUrl :  'api/work_category_reports', 
		listXType: 'workcategoryList',
		yAxisLabel : "Time Spent (mins)",
		xAxisLabel : "Category",
		panelTitle: "Category",
		worksheetId: "#personal-worksheetPanel",
		// autoChartLoad: true 
});
