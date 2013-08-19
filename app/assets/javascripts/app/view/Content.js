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
			// {
			// 	// xtype : 'bookingCalendar',
			// 	// header: false
			// 	xtype : 'container',
			// 	id : 'am-chart-wrapper',
			// 	html : "Supposed to Personal Report"
			// },
			
			{
			    xtype: 'container',
			    autoEl: {},
			    title: 'Whatever',
			    layout: 'fit',
					id : 'am-chart-wrapper' ,
					// initComponent: function(){
					// 	console.log("INit component of the container");
					// }
			},
			
			
			{
				// xtype : 'bookingProcessPanel'
				xtype : "workProcess",
				// html : "Create WorkLog"
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
