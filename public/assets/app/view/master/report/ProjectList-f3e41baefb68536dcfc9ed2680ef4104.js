Ext.define('AM.view.master.report.ProjectList' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.masterreportprojectList',

  	store: 'Projects', 
 

	initComponent: function() {
		this.columns = [
			{ header: ' Title',  dataIndex: 'title',  flex: 1 , sortable: false} ,
			{ header: ' Deadline',  dataIndex: 'deadline_date',  flex: 1 , sortable: false},
			{ header: ' Customer',  dataIndex: 'customer_name',  flex: 1 , sortable: false}
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
