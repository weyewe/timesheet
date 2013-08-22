Ext.define('AM.view.master.report.UserList' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.masterreportuserList',

  	store: 'Users', 
 

	initComponent: function() {
		this.columns = [
			{
				xtype : 'templatecolumn',
				text : "User List",
				flex : 1,
				tpl : '<b>{name}</b>' + '<br />'  +   '<br />'  + 
							'<b>{email}</b>'   + '<br />'  + '<br />'  
			},
			
			  
	
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