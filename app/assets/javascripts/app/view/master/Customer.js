Ext.define('AM.view.master.Customer', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.customerProcess',
	 
		
		items : [
			{
				xtype : 'customerlist' ,
				flex : 1 
			} 
		]
});