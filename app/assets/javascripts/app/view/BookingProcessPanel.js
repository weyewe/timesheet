Ext.define('AM.view.BookingProcessPanel', {
    extend: 'Ext.panel.Panel',
		alias : 'widget.bookingProcessPanel',
    

		layout: {
        type : 'hbox',
        align: 'stretch'
    },
    
    items: [
			{
				// width: 100,
				bodyPadding: 5,
				xtype: 'bookingProcessList',
				flex : 1
			}, 
      {
					flex :  6, 
          // title: '&nbsp;',
          id   : 'worksheetPanel', 
          // overflowY: 'auto',
          bodyPadding: 0,
					layout : {
						type: 'fit'
					},
					items : [
						{
							html : "Ini adalah tampilan booking. Anda dapat membuat booking baru, atau menambah customer",
							
						}
					]
      }
    ]

    // 
    // layout: 'border',
    // 
    // items: [
    //     {
    //         region: 'west',
    //         xtype : 'container',
    // 						html : "The west region",
    // 						width : 150,
    // 						border : true 
    //     },
    //     
    //     {
    //         region: 'center',
    //      		xtype : 'container',
    // 						html : 'the center region',
    // 						border : true 
    //     }
    // ]
});
