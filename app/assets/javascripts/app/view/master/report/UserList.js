Ext.define('AM.view.master.report.UserList' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.masterreportuserList',

  	store: 'Users', 
 

	initComponent: function() {
		this.columns = [
			{ header: ' Nama',  dataIndex: 'name',  flex: 1 , sortable: false} ,
			{ header: ' Email',  dataIndex: 'email',  flex: 1 , sortable: false}
	
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