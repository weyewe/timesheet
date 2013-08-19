Ext.define('AM.view.report.workproject.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.workprojectList',

  	store: 'Works', 
 

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
			displayMsg: 'Displaying income {0} - {1} of {2}',
			emptyMsg: "No income to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
});