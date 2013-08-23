Ext.define("AM.view.Viewport" , {
	extend : "Ext.container.Viewport",
	alias : 'widget.vp',
	
	layout : {
		type : 'card'
	},
	
	items  : [
		{
			xtype : 'authform'
		},
		{
			xtype : 'protectedcontent'
		}
	]
	
});
