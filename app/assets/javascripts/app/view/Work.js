Ext.define('AM.view.Work', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workProcess',
	 
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		
		items : [
			{
				xtype : 'worklist' ,
				flex : 1 
			} 
		]
});