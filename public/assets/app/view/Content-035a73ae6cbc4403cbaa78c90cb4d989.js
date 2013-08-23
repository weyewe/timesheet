Ext.define('AM.view.Content', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.content', 
    
    
		border: false,
		activeItem : 1 ,

		layout: {
			type : 'card',
			align: 'stretch'
		},
		
		items : [
			{
				xtype : 'personalProcessPanel'
			},
			
			
			{
				xtype : "workProcess",
			},
			{
				html : "Master Data",
				xtype : 'masterProcessPanel'
			},
			{
				html : "Third",
				xtype : 'container'
			}
		]
		 
});