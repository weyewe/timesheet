Ext.define('AM.view.report.workproject.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.workprojectList',

  	store: 'Works', 
 

	initComponent: function() {
		this.columns = [
			{
				xtype : 'templatecolumn',
				text : "Info",
				flex : 1,
				tpl : '<b>{category_name}</b>' + '<br />'  + 
							'Duration: <b>{duration}</b> mins'   + '<br />'  +  '<br />'  + 
							'{description}'
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