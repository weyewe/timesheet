Ext.define('AM.view.report.WorkProject', {
    extend: 'AM.view.ChartInspect',
    alias: 'widget.workProjectReport',

		

 		chartStoreFields : [
			'name',
			'data1',
			'id'
		],
		
		chartStoreUrl :  'api/work_project_reports', 
		listXType: 'workprojectList',
		yAxisLabel : "Time Spent (mins)",
		xAxisLabel : "Project",
		panelTitle : "Project",
		worksheetId: "#personal-worksheetPanel"
});
