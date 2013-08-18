Ext.define('AM.view.ProtectedContent', {
    extend: 'Ext.panel.Panel',
		alias : 'widget.protectedcontent',
    
    
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
    
    items: [
				{
					xtype : 'navigation',
				},
				
				{
					xtype : 'content',
					flex :  1
				}
    ]
});
