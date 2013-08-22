Ext.define('AM.view.PersonalProcessPanel', {
    extend: 'Ext.panel.Panel',
		alias : 'widget.personalProcessPanel',
    

		layout: {
        type : 'hbox',
        align: 'stretch'
    },
    
    items: [
			{
				bodyPadding: 5,
				xtype: 'personalProcessList',
				flex : 1
			}, 
      {
					flex :  6, 
          id   : 'personal-worksheetPanel', 
          bodyPadding: 0,
					layout : {
						type: 'fit'
					},
					items : [
						{
							xtype: 'personalDefault'
						}
					]
      }
    ]
 
});
