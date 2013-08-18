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
				// xtype : 'bookingCalendar',
				// header: false
				xtype : 'container',
				html : "Supposed to Personal Report"
			},
			{
				// xtype : 'bookingProcessPanel'
				xtype : "container",
				html : "Create WorkLog"
			},
			{
				// html : "Second",
				html : "Master Data",
				xtype : 'masterProcessPanel'
			},
			{
				html : "Third",
				xtype : 'container'
			}
		]
		 
});
