Ext.define('AM.view.MasterProcessPanel', {
    extend: 'Ext.panel.Panel',
		alias : 'widget.masterProcessPanel',
    

		layout: {
        type : 'hbox',
        align: 'stretch'
    },
    
    items: [
			{
				bodyPadding: 5,
				xtype: 'masterProcessList',
				flex : 1
			}, 
      {
					flex :  6, 
          id   : 'worksheetPanel', 
          bodyPadding: 0,
					layout : {
						type: 'fit'
					},
					items : [
						{
							xtype: 'masterDefault'
							 // : "Ini adalah tampilan master. Anda dapat membuat master baru, atau menambah customer",
						}
					]
      }
    ]
 
});
