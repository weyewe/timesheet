Ext.define('AM.view.report.workproject.Chart' ,{
  	extend: 'Ext.chart.Chart',
  	alias : 'widget.workprojectChart',

  	store: '', 
 		series : [], // must come from the server. Not fixed project displayed. 
		// axes : [],can be hard coded 
		

	initComponent: function() {
		this.columns = [
			{
				xtype : 'templatecolumn',
				text : "Sumber",
				flex : 1,
				tpl : '<b>{income_source_type}</b>' + '<br />' + '<br />' +
							'Code: <b>{code}</b>'   
			},
			
			 
			{ header: 'Jumlah',  dataIndex: 'amount',  flex: 1 , sortable: false} ,
			{ header: 'Waktu',  dataIndex: 'transaction_datetime',  flex: 1 , sortable: false} 
	
		];
 
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: "No Record" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
});